import { errorMessages } from '@constants';
import { reminderDtoCreators } from '@dto-creators';
import { ReminderTypeEnum } from '@enums';
import { ClientError } from '@errors';
import { remindersRepository } from '@repositories';
import { mailingService } from '@services';
import { databaseUtil, timeUtil, envUtil } from '@utils';
import debug from 'debug';

import type { IReminderAttributes } from '@entities';
import type { ICreateReminderRequest, IPaginationRequest, IUpdateReminderRequest } from '@requests';
import type { IPaginationResponse, IReminderResponse } from '@responses';

const env = envUtil.getEnv();

const logger = debug('app:error');

const reminderHandlers = {
  [ReminderTypeEnum.Email]: async (reminder: IReminderAttributes) =>
    mailingService.sendEmail(
      reminderDtoCreators.toEmailObject(env.recipient.recipientEmails, reminder),
    ),
  [ReminderTypeEnum.Phone]: () => {
    throw new Error('Not implemented yet');
  },
};

const sendEvents = async () => {
  let cursor = null;
  const limit = 100;
  const filterKey = timeUtil.getMinutelyTimeStamp(new Date());

  do {
    const reminders = await remindersRepository.getListByTime(filterKey, limit, cursor);
    for (const reminder of reminders.items) {
      try {
        await reminderHandlers[reminder.reminderType](reminder);
        await remindersRepository.deleteOneById(reminder.id);
      } catch (e) {
        logger(e);
      }
    }
    cursor = reminders.cursor ?? null;
  } while (cursor);
};

const createReminder = async (payload: ICreateReminderRequest): Promise<IReminderResponse> => {
  const reminder = reminderDtoCreators.toDbObject(payload);
  await remindersRepository.create(reminder);
  return reminderDtoCreators.createReminderResponse(reminder);
};

const updateReminder = async (
  reminderId: string,
  payload: IUpdateReminderRequest,
): Promise<IReminderResponse> => {
  const updatedReminder = await remindersRepository.update(
    reminderId,
    reminderDtoCreators.toDbUpdateObject(payload),
  );
  if (!updatedReminder.Attributes) {
    throw new ClientError(errorMessages.notExists('Reminder'), 403);
  }
  return reminderDtoCreators.createReminderResponse(
    updatedReminder.Attributes as IReminderAttributes,
  );
};

const deleteReminder = async (reminderId: string): Promise<void> => {
  await remindersRepository.deleteOneById(reminderId);
};

const getRemindersList = async (
  params: IPaginationRequest<{ reminderType: ReminderTypeEnum }>,
): Promise<IPaginationResponse<IReminderResponse[]>> => {
  let parsedCursor = null;
  let cursorResponse = null;
  if (params.cursor) {
    parsedCursor = databaseUtil.parseCursor(params.cursor);
  }
  const reminders = await remindersRepository.getList(
    params.reminderType,
    params.limit,
    parsedCursor,
  );
  if (reminders.cursor) {
    cursorResponse = databaseUtil.createCursor(reminders.cursor);
  }
  return {
    items: reminderDtoCreators.createRemindersResponse(reminders.items),
    cursor: cursorResponse,
  };
};

const getReminderById = async (reminderId: string): Promise<IReminderResponse> => {
  const reminder = await remindersRepository.getOne(reminderId);
  if (!reminder.Item) {
    throw new ClientError(errorMessages.notExists('Reminder'), 403);
  }
  return reminderDtoCreators.createReminderResponse(reminder.Item as IReminderAttributes);
};
const remindersService = {
  createReminder,
  updateReminder,
  deleteReminder,
  getRemindersList,
  getReminderById,
  sendEvents,
};

export default remindersService;

import { errorMessages } from '@constants';
import { reminderDtoCreators } from '@dto-creators';
import { remindersRepository } from '@repositories';
import { databaseUtil } from '@utils';
import ClientError from 'models/client-error';

import type { IReminderAttributes } from '@entities';
import type { ReminderTypeEnum } from '@enums';
import type { ICreateReminderRequest, IPaginationRequest, IUpdateReminderRequest } from '@requests';
import type { IPaginationResponse, IReminderResponse } from '@responses';

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
    throw new ClientError(errorMessages.notExists('Reminder'));
  }
  return reminderDtoCreators.createReminderResponse(
    updatedReminder.Attributes as IReminderAttributes,
  );
};

const deleteReminder = async (reminderId: string): Promise<void> => {
  await remindersRepository.deleteOne(reminderId);
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
    throw new ClientError(errorMessages.notExists('Reminder'));
  }
  return reminderDtoCreators.createReminderResponse(reminder.Item as IReminderAttributes);
};
const remindersService = {
  createReminder,
  updateReminder,
  deleteReminder,
  getRemindersList,
  getReminderById,
};

export default remindersService;

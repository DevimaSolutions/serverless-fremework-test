import { successMessages } from '@constants';
import { ReminderTypeEnum } from '@enums';
import { middyfy } from '@middlewares';
import { remindersService } from '@services';
import {
  createReminderSchema,
  updateReminderSchema,
  reminderIdSchema,
  paginationSchema,
} from '@validations';

import type { IPaginationResponse, IReminderResponse, ISuccessResponse } from '@responses';
import type { APIGatewayProxyEvent } from 'aws-lambda';

export const createReminder = middyfy(
  async (event: APIGatewayProxyEvent): Promise<IReminderResponse> => {
    const validatedBody = await createReminderSchema.validate(event.body);
    return remindersService.createReminder({
      ...validatedBody,
      reminderType: ReminderTypeEnum.Email,
    });
  },
);

export const updateReminder = middyfy(
  async (event: APIGatewayProxyEvent): Promise<IReminderResponse> => {
    const { reminderId } = await reminderIdSchema.validate(event.pathParameters);
    const validatedBody = await updateReminderSchema.validate(event.body);
    return remindersService.updateReminder(reminderId, validatedBody);
  },
);

export const deleteReminder = middyfy(
  async (event: APIGatewayProxyEvent): Promise<ISuccessResponse> => {
    const { reminderId } = await reminderIdSchema.validate(event.pathParameters);
    await remindersService.deleteReminder(reminderId);
    return { message: successMessages.entityDeleted };
  },
);

export const getRemindersList = middyfy(
  async (event: APIGatewayProxyEvent): Promise<IPaginationResponse<IReminderResponse[]>> => {
    const filter = await paginationSchema.validate(event.queryStringParameters ?? {});
    return remindersService.getRemindersList({
      ...filter,
      reminderType: ReminderTypeEnum.Email,
    });
  },
);

export const getReminderById = middyfy(
  async (event: APIGatewayProxyEvent): Promise<IReminderResponse> => {
    const { reminderId } = await reminderIdSchema.validate(event.pathParameters);
    return remindersService.getReminderById(reminderId);
  },
);

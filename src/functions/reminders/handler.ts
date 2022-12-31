import { successMessages } from '@constants';
import { middyfy } from '@middlewares';
import { remindersCrudService } from '@services';
import {
  createReminderSchema,
  updateReminderSchema,
  reminderIdSchema,
  reminderListSchema,
} from '@validations';

import type { IPaginationResponse, IReminderResponse, ISuccessResponse } from '@responses';
import type { APIGatewayProxyEvent } from 'aws-lambda';

export const createReminder = middyfy(
  async (event: APIGatewayProxyEvent): Promise<IReminderResponse> => {
    const validatedBody = await createReminderSchema.validate(event.body);
    return remindersCrudService.createReminder(validatedBody);
  },
);

export const updateReminder = middyfy(
  async (event: APIGatewayProxyEvent): Promise<IReminderResponse> => {
    const { reminderId } = await reminderIdSchema.validate(event.pathParameters);
    const validatedBody = await updateReminderSchema.validate(event.body);
    return remindersCrudService.updateReminder(reminderId, validatedBody);
  },
);

export const deleteReminder = middyfy(
  async (event: APIGatewayProxyEvent): Promise<ISuccessResponse> => {
    const { reminderId } = await reminderIdSchema.validate(event.pathParameters);
    await remindersCrudService.deleteReminder(reminderId);
    return { message: successMessages.entityDeleted };
  },
);

export const getRemindersList = middyfy(
  async (event: APIGatewayProxyEvent): Promise<IPaginationResponse<IReminderResponse[]>> => {
    const filter = await reminderListSchema.validate(event.queryStringParameters ?? {});
    return remindersCrudService.getRemindersList(filter);
  },
);

export const getReminderById = middyfy(
  async (event: APIGatewayProxyEvent): Promise<IReminderResponse> => {
    const { reminderId } = await reminderIdSchema.validate(event.pathParameters);
    return remindersCrudService.getReminderById(reminderId);
  },
);

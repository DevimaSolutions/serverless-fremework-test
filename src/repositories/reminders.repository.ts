import { databaseConstants } from '@constants';
import { RemindersModel } from '@models';
import { databaseUtil } from '@utils';

import type { IRepositoryPaginated } from '@dto';
import type { IReminderAttributes } from '@entities';
import type { ReminderTypeEnum } from '@enums';
import type { ICursor } from 'database/types';

const create = async (payload: IReminderAttributes) => RemindersModel.create(payload);

const update = async (reminderId: string, payload: Partial<IReminderAttributes>) =>
  RemindersModel.update({
    reminderId,
    ...databaseUtil.getUpdatingMeta(payload),
  });

const getOne = async (reminderId: string) => RemindersModel.get(reminderId);

const getList = async (
  type: ReminderTypeEnum,
  limit = 100,
  cursor?: ICursor | null,
): Promise<{ items: IReminderAttributes[]; cursor: ICursor }> => {
  const result = await RemindersModel.query('reminderType')
    .eq(type)
    .startAt(cursor)
    .using(databaseConstants.databaseIndexName.sortIndex)
    .limit(limit)
    .sort('descending')
    .exec();

  return {
    items: result.length ? result : [],
    cursor: result.lastKey ?? null,
  };
};

const getListByTime = async (
  sendKey: number,
  limit = 100,
  cursor?: ICursor | null,
): Promise<IRepositoryPaginated<IReminderAttributes[]>> => {
  const result = await RemindersModel.query('sendDate')
    .eq(sendKey)
    .startAt(cursor)
    .using(databaseConstants.databaseIndexName.timeIndex)
    .limit(limit)
    .sort('descending')
    .exec();

  return {
    items: result.length ? result : [],
    cursor: result.lastKey ?? null,
  };
};

const deleteOneById = async (reminderId: string) => RemindersModel.delete(reminderId);

const remindersRepository = { create, update, getOne, deleteOneById, getList, getListByTime };

export default remindersRepository;

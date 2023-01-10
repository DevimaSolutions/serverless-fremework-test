import type { AnyItem } from 'dynamoose/dist/Item';

export interface IBaseAttributes extends AnyItem {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IEntityToCreate<T> = T & IBaseAttributes;

export type IEntityToUpdate<T> = Partial<T> & { updatedAt: Date };

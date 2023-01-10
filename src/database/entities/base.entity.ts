export interface IBaseAttributes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IEntityToCreate<T> = T & IBaseAttributes;

export type IEntityToUpdate<T> = Partial<T> & { updatedAt: Date };

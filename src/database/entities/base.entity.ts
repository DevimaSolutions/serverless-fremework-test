export interface IBaseAttributes {
  id: string;
  createdAt: number;
  updatedAt: number;
}

export type IEntityToCreate<T> = T & IBaseAttributes;

export type IEntityToUpdate<T> = Partial<T> & { updatedAt: Date };

import { object, number, string } from 'yup';

export const paginationSchema = object()
  .shape({
    cursor: string(),
    limit: number(),
  })
  .noUnknown();

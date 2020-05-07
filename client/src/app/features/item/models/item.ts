import { schema } from 'normalizr';

export interface Item {
  classId: string;
  name: string;
  appId: number;
  contextId: number;
  icon: string;
  price: number;
}

const idAttribute: keyof Item = 'classId';
export const itemSchema = new schema.Entity('items', {}, { idAttribute });
export const selectItemId = (item: Item): string => item[idAttribute];

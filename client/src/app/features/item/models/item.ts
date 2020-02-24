import { schema } from 'normalizr';

export interface Item {
  classId: string;
  name: string;
  appId: number;
  contextId: number;
  icon: string;
  price: number;
}

export const itemSchema = new schema.Entity('items', {}, { idAttribute: 'classId' });

import { Entities } from '../models/entities';
import { denormalize as denormalizr, normalize as normalizr, Schema } from 'normalizr';

export function normalize<T>(input: T, schema: Schema): Entities {
  return normalizr(input, schema).entities;
}

export function denormalize<T>(input: any, schema: Schema, entities: Entities): T {
  return denormalizr(input, schema, entities);
}

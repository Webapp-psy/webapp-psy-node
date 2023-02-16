import { ModelConstructor, ModelOptions } from '../type/model.type';

export function createModel<
  Model,
  Entity,
  Options extends ModelOptions = ModelOptions
  >(
  ctor: ModelConstructor<Entity, Model, Options>,
  data: Entity,
  options?: Options
): Model {
  return new ctor(data, options);
}

export function createModels<
  Model,
  Entity,
  Options extends ModelOptions = ModelOptions
  >(
  ctor: ModelConstructor<Entity, Model, Options>,
  data: Entity[],
  options?: Options[]
): Model[] {
  return data.map((value, index) => createModel(ctor, value, options?.[index]));
}

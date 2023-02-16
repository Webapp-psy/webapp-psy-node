export interface ModelConstructor<Entity, Model, Options> {
  new (entity: Entity, options?: Options): Model;
}

export interface ModelOptions {
  includes?: {
    [key: string]: boolean;
  };
}

import { ormDataSource } from '../source';
import { PsychologistEntity } from "../entity/psychologist.entity";
import { ILike } from "typeorm";
import { PsychologistListParams } from "../type/psychologist.type";

export const psychologistRepository = ormDataSource
  .getRepository(PsychologistEntity)
  .extend({
    // list, pagination, filter for patients
    findAndCountList({
                       filter,
                       take,
                       skip,
                       columnSorted,
                       sort,
                       options = {},
                     }: PsychologistListParams) {
      options.take = take;
      options.skip = skip;

      if (filter) {
        options.where = [];
        // boolean filter
        if (['true', 'false'].includes(String(filter.value))) {
          options.where = {
            isEnabled: filter.value === 'true',
          };
          // number filter
        } else if (!isNaN(+filter.value)) {
          options.where = {
            id: +filter.value,
          };
          // string
        } else {
          options.where = [
            {
              firstName: ILike('%' + String(filter.value) + '%'),
            },
            {
              lastName: ILike('%' + String(filter.value) + '%'),
            },
            {
              email: ILike('%' + String(filter.value) + '%'),
            },
          ];
        }
      }
      if (sort) {
        options.order = {
          [String(columnSorted)]: sort,
        };
      }

      return psychologistRepository.findAndCount({
        ...options,
        relations: {
          patient: true,
          ...options?.relations,
        },
      });
    },
  });

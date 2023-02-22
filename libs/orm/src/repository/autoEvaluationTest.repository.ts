import { ormDataSource } from '../source';
import { AutoEvaluationTestEntity } from "@libs/orm";
import { ILike } from "typeorm";
import { AutoEvaluationTestListParams } from "../type/autoEvaluation.type";

export const autoEvaluationTestRepository = ormDataSource
  .getRepository(AutoEvaluationTestEntity)
  .extend({
    // list, pagination, filter for auto Evaluation
    findAndCountList({
                       filter,
                       take,
                       skip,
                       columnSorted,
                       sort,
                       options = {},
                     }: AutoEvaluationTestListParams) {
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
              event: ILike('%' + String(filter.value) + '%'),
            },
            {
              automaticThoughts: ILike('%' + String(filter.value) + '%'),
            },
          ];
        }
      }
      if (sort) {
        options.order = {
          [String(columnSorted)]: sort,
        };
      }

      return autoEvaluationTestRepository.findAndCount({
        ...options,
        relations: {
          ...options?.relations,
        },
      });
    },
  });

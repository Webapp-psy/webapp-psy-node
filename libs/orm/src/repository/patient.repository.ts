import { ormDataSource } from '../source';
import { PatientEntity } from "@libs/orm";
import { PatientListParams } from "../type/patient.type";
import { ILike } from "typeorm";

export const patientRepository = ormDataSource
  .getRepository(PatientEntity)
  .extend({
    // list, pagination, filter for portfolios
    findAndCountList({
                       filter,
                       take,
                       skip,
                       columnSorted,
                       sort,
                       options = {},
                     }: PatientListParams) {
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

      return patientRepository.findAndCount({
        ...options,
        relations: {
          autoObservationTest: true,
          ...options?.relations,
        },
      });
    },
  });

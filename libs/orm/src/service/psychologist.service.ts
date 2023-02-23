import { FindManyOptions } from "typeorm";
import {
  createModels,
  PsychologistEntity,
  psychologistRepository
} from "@libs/orm";
import { PsychologistListParams } from "../type/psychologist.type";
import { PsychologistModel } from "../model/psychologist.model";

export async function getPsychologists(
  limit: number,
  offset: number,
  filter?: string | boolean | number,
  columnSorted?: string,
  sort?: 'asc' | 'desc' | null,
  visible: boolean = false
) {
  const params: PsychologistListParams = {
    take: limit,
    skip: offset,
  };

  const options: FindManyOptions<PsychologistEntity> = {};

  if (filter) {
    params.filter = {
      value: filter,
    };
  }

  if (sort && columnSorted) {
    params.columnSorted = columnSorted;
    params.sort = sort;
  }

  if (visible) {
    options.where = {
      isEnabled: true,
    };
  }

  params.options = options;

  const [psychologistEntities, totalPsychologists] =
    await psychologistRepository.findAndCountList(params);


  const psychologists = createModels(
    PsychologistModel,
    psychologistEntities
  );

  return {
    psychologists,
    totalPsychologists,
  };
}

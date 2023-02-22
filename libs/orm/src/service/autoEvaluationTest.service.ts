import { FindManyOptions } from 'typeorm';
import {
  AutoEvaluationTestEntity,
  createModels,
  autoEvaluationTestRepository,
  AutoEvaluationTestModel
} from "@libs/orm";
import { AutoEvaluationTestListParams } from "../type/autoEvaluation.type";

export async function getAutoEvaluationTests(
  limit: number,
  offset: number,
  filter?: string | boolean | number,
  columnSorted?: string,
  sort?: 'asc' | 'desc' | null,
  visible: boolean = false
) {
  const params: AutoEvaluationTestListParams = {
    take: limit,
    skip: offset,
  };

  const options: FindManyOptions<AutoEvaluationTestEntity> = {};

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

  const [autoEvaluationEntities, totalAutoEvaluations] =
    await autoEvaluationTestRepository.findAndCountList(params);

  const autoEvaluations = createModels(
    AutoEvaluationTestModel,
    autoEvaluationEntities
  );

  return {
    autoEvaluations,
    totalAutoEvaluations,
  };
}

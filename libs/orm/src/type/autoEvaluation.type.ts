import { FindManyOptions } from "typeorm";
import { AutoEvaluationTestEntity, AutoEvaluationTestModel } from "@libs/orm";

export interface AutoEvaluationTestListParams {
  filter?: {
    value: string | number | boolean;
  };
  columnSorted?: string;
  sort?: 'asc' | 'desc' | null;
  take: number;
  skip: number;
  options?: FindManyOptions<AutoEvaluationTestEntity>;
}

export type AutoEvaluationsResponse = {
  /**
   * list of patient
   */
  autoEvaluations: AutoEvaluationTestModel[];
  /**
   * count patients rendering by api
   */
  totalAutoEvaluations: number;
};

export type PostAutoEvaluationBody = {
  event: string;
  automaticThoughts: string;
  emotions: PostEmotions[];
}

export type PostEmotions = {
  title: string;
  percentage: number;
}

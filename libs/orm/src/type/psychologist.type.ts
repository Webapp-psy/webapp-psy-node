import { FindManyOptions } from "typeorm";
import { PsychologistEntity } from "@libs/orm";
import { PsychologistModel } from "../model/psychologist.model";

export interface PsychologistListParams {
  filter?: {
    value: string | number | boolean;
  };
  columnSorted?: string;
  sort?: 'asc' | 'desc' | null;
  take: number;
  skip: number;
  options?: FindManyOptions<PsychologistEntity>;
}

export type PsychologistsResponse = {
  /**
   * list of psychologists
   */
  psychologists: PsychologistModel[];
  /**
   * count psycghologists rendering by api
   */
  totalPsychologists: number;
};

export type CreatePsychologistBody = {
  firstName: string;
  lastName: string;
  email: string;
  isEnabled: boolean;
};

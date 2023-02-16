import { FindManyOptions } from "typeorm";
import { PatientEntity } from "@libs/orm";
import { PatientModel } from "../model/patient.model";

export interface PatientListParams {
  filter?: {
    value: string | number | boolean;
  };
  columnSorted?: string;
  sort?: 'asc' | 'desc' | null;
  take: number;
  skip: number;
  options?: FindManyOptions<PatientEntity>;
}

export type PatientsResponse = {
  /**
   * list of patient
   */
  patients: PatientModel[];
  /**
   * count patients rendering by api
   */
  totalPatients: number;
};

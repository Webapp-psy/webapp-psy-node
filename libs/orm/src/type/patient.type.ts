import { FindManyOptions } from "typeorm";
import { PatientEntity, PatientModel } from "@libs/orm";

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

export type CreatePatientBody = {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  dateOfBirth?: Date;
  isEnabled: boolean;
};

export type PutPatient = {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: Date;
  isEnabled?: boolean;
};

export interface SignInRequest {
  email: string;
  password: string;
}

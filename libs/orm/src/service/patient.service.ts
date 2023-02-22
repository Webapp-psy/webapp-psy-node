import { FindManyOptions } from 'typeorm';
import { PatientListParams } from "../type/patient.type";
import { createModels, PatientEntity, PatientModel, patientRepository } from "@libs/orm";

export async function getPatients(
  limit: number,
  offset: number,
  filter?: string | boolean | number,
  columnSorted?: string,
  sort?: 'asc' | 'desc' | null,
  visible: boolean = false
) {
  const params: PatientListParams = {
    take: limit,
    skip: offset,
  };

  const options: FindManyOptions<PatientEntity> = {
    relations: {
      autoEvaluationTest: true
    },
  };

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

  const [patientEntities, totalPatients] =
    await patientRepository.findAndCountList(params);


  const patients = createModels(
    PatientModel,
    patientEntities
  );

  return {
    patients,
    totalPatients,
  };
}

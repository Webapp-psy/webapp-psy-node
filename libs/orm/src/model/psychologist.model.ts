import { createModel, PatientModel, PsychologistEntity } from "@libs/orm";

export class PsychologistModel {
  id: number;
  /**
   * psychologist firstname
   */
  firstName: string;
  /**
   * psychologist lastname
   */
  lastName: string;
  /**
   * psychologist email
   */
  email: string;
  /**
   * psychologist is visible or not
   */
  isEnabled: boolean;
  /**
   * psychologist autoEvaluationTests
   */
  patients: PatientModel[];

  constructor(psychologist: PsychologistEntity,) {
    this.id = psychologist.id;
    this.firstName = psychologist.firstName;
    this.lastName = psychologist.lastName;
    this.email = psychologist.email;
    this.isEnabled = psychologist.isEnabled;

    if (psychologist.patient) {
      this.patients = [];
      for (const patient of psychologist.patient) {
        this.patients.push(patient);
        createModel(PatientModel, patient);
      }
    }
  }
}

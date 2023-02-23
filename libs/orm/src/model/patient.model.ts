import { createModel, PatientEntity, PsychologistEntity } from "@libs/orm";
import { AutoEvaluationTestModel } from "./autoEvaluationTest.model";

export class PatientModel {
  id: number;
  /**
   * patient firstname
   */
  firstName: string;
  /**
   * patient lastname
   */
  lastName: string;
  /**
   * patient email
   */
  email: string;
  /**
   * patient date of birth
   */
  dateOfBirth: Date;
  /**
   * patient is visible or not
   */
  isEnabled: boolean;
  /**
   * psychologist linked to the patient
   */
  psychologist: PsychologistEntity;
  /**
   * patient autoEvaluationTests
   */
  autoEvaluationTest: AutoEvaluationTestModel[];

  constructor(patient: PatientEntity,) {
    this.id = patient.id;
    this.firstName = patient.firstName;
    this.lastName = patient.lastName;
    this.email = patient.email;
    this.dateOfBirth = patient.dateOfBirth;
    this.psychologist = patient.psychologist;
    this.isEnabled = patient.isEnabled;

    if (patient.autoEvaluationTest) {
      this.autoEvaluationTest = [];
      for (const autoEvaluationTest of patient.autoEvaluationTest) {
        this.autoEvaluationTest.push(autoEvaluationTest);
        createModel(AutoEvaluationTestModel, autoEvaluationTest);
      }
    }
  }
}

import { createModel, PatientEntity } from "@libs/orm";
import { AutoEvaluationTestModel } from "./autoEvaluationTest.model";

export class PatientModel {
  id: number;
  /**
   * portfolio name
   */
  firstName: string;
  /**
   * portfolio short description
   */
  lastName: string;
  /**
   * portfolio description
   */
  email: string;
  /**
   * portfolio logoUrl
   */
  dateOfBirth: Date;
  /**
   * portfolio is visible or not
   */
  isEnabled: boolean;
  /**
   * portfolio assets
   */
  autoEvaluationTest: AutoEvaluationTestModel[];

  constructor(patient: PatientEntity,) {
    this.id = patient.id;
    this.firstName = patient.firstName;
    this.lastName = patient.lastName;
    this.email = patient.email;
    this.dateOfBirth = patient.dateOfBirth;
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

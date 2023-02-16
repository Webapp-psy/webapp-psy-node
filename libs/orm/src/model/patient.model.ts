import { createModel, PatientEntity } from "@libs/orm";
import { AutoObservationTestModel } from "./autoObservationTest.model";

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
  autoEvaluationTest: AutoObservationTestModel[];

  constructor(patient: PatientEntity,) {
    this.id = patient.id;
    this.firstName = patient.firstName;
    this.lastName = patient.lastName;
    this.email = patient.email;
    this.dateOfBirth = patient.dateOfBirth;
    this.isEnabled = patient.isEnabled;

    if (patient.autoObservationTest) {
      this.autoEvaluationTest = [];
      for (const autoEvaluationTest of patient.autoObservationTest) {
        this.autoEvaluationTest.push(autoEvaluationTest);
       createModel(AutoObservationTestModel, autoEvaluationTest);
      }
    }
  }
}

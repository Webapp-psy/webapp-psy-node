import {
  Example,
  Get,
  OperationId,
  Query,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import { getPatients, MAX_ENTITIES_PER_PAGES } from "@libs/orm";
import { PatientListParams, PatientsResponse } from "../../../../libs/orm/src/type/patient.type";

@Route()
export class PatientController {
  /**
   * @summary Get a list of all visible patients
   * @param limit Number of patients to get
   * @param offset Number of patients to skip
   * @param filter Search field
   * @param columnSorted Column to order by
   * @param sort Sort mode
   */
  @Tags('Patient')
  @Get('/')
  @OperationId('getAllPatients')
  @SuccessResponse(200, 'List of patients')
  @Response(500, 'Internal Server Error')
  @Example({
    totalPatients: 1,
    //  patient: [PortfolioDemoExample],
  })
  static async getAllPatients(
    @Query() limit: number = MAX_ENTITIES_PER_PAGES,
    @Query() offset = 0,
    @Query() filter?: string | boolean | number,
    @Query() columnSorted?: PatientListParams['columnSorted'],
    @Query() sort?: 'asc' | 'desc' | null
  ): Promise<PatientsResponse> {
    return getPatients(limit, offset, filter, columnSorted, sort, true);
  }
}

import {
  Body, Delete,
  Get, Inject,
  OperationId, Path, Post, Put,
  Query,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import {
  createModel,
  getPatients, HttpInternalServerError, HttpNotFoundError,
  MAX_ENTITIES_PER_PAGES,
  PatientEntity,
  PatientModel,
  patientRepository
} from "@libs/orm";
import { CreatePatientBody, PatientListParams, PatientsResponse } from "../../../../libs/orm/src/type/patient.type";
import { EntityNotFoundError } from "typeorm";

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
  static async getAllPatients(
    @Query() limit: number = MAX_ENTITIES_PER_PAGES,
    @Query() offset = 0,
    @Query() filter?: string | boolean | number,
    @Query() columnSorted?: PatientListParams['columnSorted'],
    @Query() sort?: 'asc' | 'desc' | null
  ): Promise<PatientsResponse> {
    return getPatients(limit, offset, filter, columnSorted, sort, true);
  }

  /**
   * @summary Get patient's details by id
   * @param patient
   * @param id patient id
   */
  @Get('/:id')
  @OperationId('getPatient')
  @Tags('getPatient')
  @Response(404, 'Not found')
  @Response(500, 'Internal server error')
  static async get(
    @Inject() patient: PatientEntity,
    @Path() id: number // used in openapi
  ): Promise<PatientModel> {
    return createModel(PatientModel, patient);
  }

  /**
   * @summary Create a patient
   * @param postedData
   */
  @Post('/')
  @OperationId('postPatient')
  @Tags('postPatient')
  @Response(500, 'Internal server error')
  static async create(
    @Body() postedData: CreatePatientBody
  ): Promise<any> {
    postedData.isEnabled = true;

    return createModel(
      PatientModel,
      await patientRepository.save({
        ...postedData,
      })
    );
  }

  /**
   * @summary Update patient from id
   */
  @Put('/:id')
  @OperationId('putPatient')
  @SuccessResponse(200, 'Update a user patient entity')
  @Response(404, 'Patient not found')
  @Response(500, 'Server error')
  static async put(@Path() id: number, @Body() body: any) {
    return patientRepository
      .findOneByOrFail({
        id,
      })
      .then(async (patientEntity) => {
        if (body.firstName) {
          patientEntity.firstName = body.firstName;
        }
        if (body.lastName) {
          patientEntity.lastName = body.lastName;
        }
        if (body.email) {
          patientEntity.email = body.email;
        }
        if (body.dateOfBirth) {
          patientEntity.dateOfBirth = body.dateOfBirth;
        }
        if (typeof body.isEnabled === 'boolean') {
          patientEntity.isEnabled = body.isEnabled;
        }
        return patientRepository.save(patientEntity);
      })
      .catch((e) => {
        if (e instanceof EntityNotFoundError) {
          throw HttpNotFoundError('Patient not found');
        }
        throw HttpInternalServerError(e.message);
      });
  }

  /**
   HttpError,
   * @summary Delete a patient by id
   * @param patient
   * @param id patientId
   */
  @Delete('/:id')
  @OperationId('deletePatient')
  @Tags('deletePatient')
  @Response(404, 'Not found')
  @Response(500, 'Internal server error')
  static async logicalDelete(
    @Inject() patient: PatientEntity,
    @Path() id: number
  ) {
    return await patientRepository.softDelete(patient.id);
  }
}

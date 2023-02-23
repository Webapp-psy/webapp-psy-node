import {
  Body,
  Get, Inject,
  OperationId, Path, Post,
  Query,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import {
  createModel,
  CreatePsychologistBody,
  getPsychologists,
  MAX_ENTITIES_PER_PAGES,
  PatientListParams,
  PsychologistEntity,
  PsychologistModel,
  psychologistRepository,
  PsychologistsResponse,
} from "@libs/orm";

@Route()
export class PsychologistController {
  /**
   * @summary Get a list of all visible patients
   * @param limit Number of patients to get
   * @param offset Number of patients to skip
   * @param filter Search field
   * @param columnSorted Column to order by
   * @param sort Sort mode
   */
  @Tags('Psychologists')
  @Get('/')
  @OperationId('getAllPsychologists')
  @SuccessResponse(200, 'List of psychologists')
  @Response(500, 'Internal Server Error')
  static async getAllPsychologists(
    @Query() limit: number = MAX_ENTITIES_PER_PAGES,
    @Query() offset = 0,
    @Query() filter?: string | boolean | number,
    @Query() columnSorted?: PatientListParams['columnSorted'],
    @Query() sort?: 'asc' | 'desc' | null
  ): Promise<PsychologistsResponse> {
    return getPsychologists(limit, offset, filter, columnSorted, sort, true);
  }

  /**
   * @summary Get psychologist's details by id
   * @param psychologist
   * @param id psychologist id
   */
  @Get('/:id')
  @OperationId('getPsychologist')
  @Tags('getPsychologist')
  @Response(404, 'Not found')
  @Response(500, 'Internal server error')
  static async get(
    @Inject() psychologist: PsychologistEntity,
    @Path() id: number // used in openapi
  ): Promise<PsychologistModel> {
    return createModel(PsychologistModel, psychologist);
  }

  /**
   * @summary Create a patient
   * @param postedData
   */
  @Post('/')
  @OperationId('postPsychologist')
  @Tags('postPsychologist')
  @Response(500, 'Internal server error')
  static async create(
    @Body() postedData: CreatePsychologistBody
  ): Promise<any> {
    postedData.isEnabled = true;

    return createModel(
      PsychologistModel,
      await psychologistRepository.save({
        ...postedData,
      })
    );
  }
}

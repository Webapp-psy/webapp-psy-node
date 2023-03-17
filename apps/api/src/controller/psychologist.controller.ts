import {
  Body, Delete,
  Get, Inject,
  OperationId,
  Path,
  Post,
  Put,
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
  HttpInternalServerError,
  HttpNotAcceptableError,
  HttpNotFoundError,
  MAX_ENTITIES_PER_PAGES,
  PatientListParams,
  PsychologistEntity,
  PsychologistModel,
  psychologistRepository,
  PsychologistsResponse,
} from "@libs/orm";
import { EntityNotFoundError } from "typeorm";
import { hashPassword } from "../service/auth.service";

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
  ) {
    postedData.isEnabled = true;

    if (postedData.password == postedData.confirmPassword) {
      postedData.password = await hashPassword(postedData.password);
    } else {
      throw HttpNotAcceptableError('Password are not identicals');
    }

    return createModel(
      PsychologistModel,
      await psychologistRepository.save({
        ...postedData,
      })
    );
  }

  /**
   * @summary Update psychologist from id
   */
  @Put('/:id')
  @OperationId('putPsychologist')
  @SuccessResponse(200, 'Update a user psychologist entity')
  @Response(404, 'Psychologist not found')
  @Response(500, 'Server error')
  static async put(@Path() id: number, @Body() body: any) {
    return psychologistRepository
      .findOneByOrFail({
        id,
      })
      .then(async (psychologistEntity) => {
        if (body.firstName) {
          psychologistEntity.firstName = body.firstName;
        }
        if (body.lastName) {
          psychologistEntity.lastName = body.lastName;
        }
        if (body.email) {
          psychologistEntity.email = body.email;
        }
        if (typeof body.isEnabled === 'boolean') {
          psychologistEntity.isEnabled = body.isEnabled;
        }
        return psychologistRepository.save(psychologistEntity);
      })
      .catch((e) => {
        if (e instanceof EntityNotFoundError) {
          throw HttpNotFoundError('Psychologist not found');
        }
        throw HttpInternalServerError(e.message);
      });
  }

  /**
   HttpError,
   * @summary Delete a psychologist by id
   * @param psychologist
   * @param id psychologistId
   */
  @Delete('/:id')
  @OperationId('deletePsychologist')
  @Tags('deletePsychologist')
  @Response(404, 'Not found')
  @Response(500, 'Internal server error')
  static async logicalDelete(
    @Inject() psychologist: PsychologistEntity,
    @Path() id: number
  ) {
    return await psychologistRepository.softDelete(psychologist.id);
  }
}

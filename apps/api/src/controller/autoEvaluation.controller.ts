import {
  Get,
  OperationId,
  Query,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from 'tsoa';
import {
  AutoEvaluationsResponse,
  AutoEvaluationTestListParams,
  getAutoEvaluationTests,
  MAX_ENTITIES_PER_PAGES
} from "@libs/orm";

@Route()
export class AutoEvaluationController {
  /**
   * @summary Get a list of all visible auto evaluation tests
   * @param limit Number of auto evaluation tests to get
   * @param offset Number of auto evaluation tests to skip
   * @param filter Search field
   * @param columnSorted Column to order by
   * @param sort Sort mode
   */
  @Tags('AutoEvaluationTest')
  @Get('/')
  @OperationId('getAllAutoEvaluationTests')
  @SuccessResponse(200, 'List of auto evaluation tests')
  @Response(500, 'Internal Server Error')
  static async getAllAutoEvaluations(
    @Query() limit: number = MAX_ENTITIES_PER_PAGES,
    @Query() offset = 0,
    @Query() filter?: string | boolean | number,
    @Query() columnSorted?: AutoEvaluationTestListParams['columnSorted'],
    @Query() sort?: 'asc' | 'desc' | null
  ): Promise<AutoEvaluationsResponse> {
    return getAutoEvaluationTests(limit, offset, filter, columnSorted, sort, true);
  }
}

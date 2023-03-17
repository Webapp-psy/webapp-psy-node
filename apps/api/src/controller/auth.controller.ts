import {
  Route,
  OperationId,
  Post,
  Body,
  Tags,
  Response,
  SuccessResponse,
} from 'tsoa';
import { EntityNotFoundError } from 'typeorm';
import {
  AuthToken, HttpInternalServerError,
  HttpNotAcceptableError, HttpNotFoundError,
  PasswordNotSimilarException,
  SignInRequest
} from "@libs/orm";
import { signIn } from '../service/auth.service';

@Route('auth')
@Tags('Admin')
export class AuthController {

  /**
   * @summary Gives jwt token needed to access admin page
   * @param body : email + password
   */
  @Post('/sign-in')
  @OperationId('psychologistSignIn')
  @SuccessResponse(
    200,
    'Psychologist successfully logged and response containing an access token'
  )
  @Response(404, 'Psychologist Not Found')
  @Response(403, 'Psychologist account not active, please contact an administrator')
  @Response(406, 'Invalid credentials')
  @Response(500, 'Internal server error')
  static signIn(@Body() body: SignInRequest): Promise<AuthToken> {
    return signIn(body.email, body.password)
      .then(async (accessToken) => {
        return {
          accessToken
        };
      })
      .catch((e) => {
        if (e instanceof PasswordNotSimilarException) {
          throw HttpNotAcceptableError('Invalid credentials');
        }
        if (e instanceof EntityNotFoundError) {
          throw HttpNotFoundError('User not found');
        }
        throw HttpInternalServerError(e.message ?? 'Internal server error');
      });
  }
}

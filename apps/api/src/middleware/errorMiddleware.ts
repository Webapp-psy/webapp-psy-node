import {
  ErrorRequestHandler,
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from 'express';
import { validationResult } from 'express-validator';

export const checkErrorMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    res.status(406).json({
      errors: errors.array(),
    });
  }
};

export const httpErrorMiddleware: ErrorRequestHandler = (
  e,
  _req,
  res,
  next
) => {
  console.error(e);

  let statusCode = 500;

  const response: {
    error: string;
    code?: number;
  } = {
    error: e.message || 'Internal Server Error',
  };

  if (e.statusCode) {
    statusCode = e.statusCode;
  }

  if (e.code) {
    response.code = e.code;
  }

  res.status(statusCode).json(response);

  next();
};

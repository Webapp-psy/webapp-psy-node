import { NextFunction, Request, RequestHandler, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

import { HttpError, HttpNotAcceptableError, HttpNotFoundError, patientRepository } from "@libs/orm";

export const patientHandlerMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.params;

  if (isNaN(+id)) {
    return next(HttpNotAcceptableError(`Invalid patient id: ${ id }`));
  }

  try {
    res.locals.patientEntity = await patientRepository.findOneOrFail({
      where: {
        id: +id,
      },
      relations: {
        autoEvaluationTest: {
          emotions: true
        }
      },
    });
  } catch (e) {
    if (e instanceof EntityNotFoundError) {
      next(
        HttpNotFoundError('Patient not found', {
          previous: e,
        })
      );
    } else if (e instanceof Error) {
      next(
        HttpError(500, e.message, {
          previous: e,
        })
      );
    } else {
      next(HttpError(500, 'Internal server error'));
    }
    return;
  }

  next();
};

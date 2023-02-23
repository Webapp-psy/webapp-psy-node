import { NextFunction, Request, RequestHandler, Response } from 'express';
import { EntityNotFoundError } from 'typeorm';

import { HttpError, HttpNotAcceptableError, HttpNotFoundError, psychologistRepository } from "@libs/orm";

export const psychologistHandlerMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.params;

  if (isNaN(+id)) {
    return next(HttpNotAcceptableError(`Invalid psychologist id: ${ id }`));
  }

  try {
    res.locals.psychologistEntity = await psychologistRepository.findOneOrFail({
      where: {
        id: +id,
      },
      relations: {
        patient: true
      },
    });
  } catch (e) {
    if (e instanceof EntityNotFoundError) {
      next(
        HttpNotFoundError('Psychologist not found', {
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

import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HttpUnauthorizedError } from "@libs/orm";

function verify(headers: Request['headers']) {
  const { authorization } = headers;

  if (!authorization) {
    throw HttpUnauthorizedError('No header Authorization');
  }

  const token = authorization.replace('Bearer ', '');

  console.log(token)
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;
  } catch (e) {
    throw HttpUnauthorizedError('Invalid token');
  }
}

export const authenticateJWTPatient = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = verify(req.headers);
    res.locals.patient = data.patient;
    next();
  } catch (e) {
    next(HttpUnauthorizedError('Invalid token'));
  }
};

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = verify(req.headers);
    res.locals.psychologist = data.psychologist;
    next();
  } catch (e) {
    next(HttpUnauthorizedError('Invalid token'));
  }
};

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  createModel,
  PasswordNotSimilarException,
  PsychologistEntity,
  PsychologistModel,
  psychologistRepository
} from "@libs/orm";

export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err: Error, salt: string) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, async function (err: Error, hash: string) {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  });
}

export async function signIn(email: string, password: string): Promise<string> {
  const psychologist = await psychologistRepository.findOneByOrFail({
    email: email,
  });
  return bcryptPassword(password, psychologist);
}

function bcryptPassword(password: string, psychologist: PsychologistEntity) {
  return new Promise<string>((resolve, reject) => {
    bcrypt.compare(
      password,
      psychologist.password,
      async function (err: Error, result: boolean) {
        if (!result) {
          return reject(
            new PasswordNotSimilarException('Password are not similar')
          );
        }
        try {
          resolve(jwtSign(createModel(PsychologistModel, psychologist)));
        } catch (e) {
          reject(e);
        }
      }
    );
  });
}
export function jwtSign(psychologist:  PsychologistModel) {
  return jwt.sign(
    {
      psychologist
    },
    process.env.JWT_SECRET_KEY as string,
    {
      expiresIn: 86400, // 24 hours
    }
  );
}

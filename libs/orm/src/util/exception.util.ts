abstract class Exception extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class PasswordNotSimilarException extends Exception {}

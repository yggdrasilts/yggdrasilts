import { ArangoError, SystemError } from 'arangojs/error';

export class ArangoDBException extends Error {
  constructor(message: string, private readonly extra?: { arangoDBError?: ArangoError | SystemError }) {
    super(message);
  }

  public getArangoError(): ArangoError | SystemError {
    return this.extra?.arangoDBError;
  }
}

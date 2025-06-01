export abstract class BaseError extends Error {
  abstract readonly type: string;
  constructor(message: string) {
    super(message);
    this.name = 'BaseError';
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

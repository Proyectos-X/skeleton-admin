import { BaseError } from './Base-error';

export class AppError extends BaseError {
  readonly type: string = 'AppError';
  public statusCode?: number;
  public originalError?: unknown;
  public details?: Record<string, string[]>; // para validaciones Nest

  constructor({
    message,
    statusCode,
    originalError,
    details,
  }: {
    message: string;
    statusCode?: number;
    originalError?: unknown;
    details?: Record<string, string[]>;
  }) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.originalError = originalError;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
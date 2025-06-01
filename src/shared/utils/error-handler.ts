import axios from 'axios';
import { AppError } from './errors/app-error';

export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data;

    const message =
      data?.message || error.message || 'Error en la petición HTTP';
    const details = data?.errors ?? undefined;

    throw new AppError({
      message,
      statusCode: status,
      originalError: error,
      details,
    });
  }

  if (error instanceof AppError) {
    // Ya fue procesado y reenviado, no hacer nada
    throw error;
  }

  if (error instanceof Error) {
    // Otro tipo de error lanzado (ej: SyntaxError, TypeError, etc.)
    throw new AppError({
      message: error.message,
      originalError: error,
    });
  }

  // Cualquier otra cosa (nulo, string, boolean, etc.)
  throw new AppError({
    message: 'Error desconocido no manejado',
    originalError: error,
  });
};

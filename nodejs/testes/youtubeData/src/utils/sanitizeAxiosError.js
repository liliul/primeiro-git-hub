import axios from 'axios';

export function sanitizeAxiosError(error) {
  if (!axios.isAxiosError(error)) {
    return {
      message: error?.message ?? 'Erro desconhecido',
    };
  }

  return {
    message: error.message,
    status: error.response?.status,
    url: error.config?.url,
    method: error.config?.method,
    data: error.response?.data,
  };
}

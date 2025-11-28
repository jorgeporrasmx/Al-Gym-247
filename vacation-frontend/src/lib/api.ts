const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001/api';

interface ApiOptions {
  method?: string;
  body?: any;
  token?: string;
}

export async function api<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Error de servidor' }));
    throw new Error(error.message || 'Error en la solicitud');
  }

  return response.json();
}

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    api<{ accessToken: string; employee: any }>('/auth/login', {
      method: 'POST',
      body: { email, password },
    }),

  register: (data: any) =>
    api<{ accessToken: string; employee: any }>('/auth/register', {
      method: 'POST',
      body: data,
    }),

  me: (token: string) =>
    api<any>('/auth/me', { token }),
};

// Employees
export const employeesApi = {
  getBalance: (token: string) =>
    api<{ diasTotales: number; diasUsados: number; diasDisponibles: number; antiguedad: number }>(
      '/employees/me/balance',
      { token }
    ),

  getProfile: (token: string) =>
    api<any>('/employees/me', { token }),
};

// Vacations
export const vacationsApi = {
  create: (data: any, token: string) =>
    api<any>('/vacations', { method: 'POST', body: data, token }),

  getMyRequests: (token: string) =>
    api<any[]>('/vacations', { token }),

  getPending: (token: string) =>
    api<any[]>('/vacations/pending', { token }),

  approve: (id: string, comentarios: string, token: string) =>
    api<any>(`/vacations/${id}/approve`, {
      method: 'POST',
      body: { comentarios },
      token,
    }),

  reject: (id: string, comentarios: string, token: string) =>
    api<any>(`/vacations/${id}/reject`, {
      method: 'POST',
      body: { comentarios },
      token,
    }),

  getRules: (token: string) =>
    api<any>('/vacations/rules', { token }),
};

// Calendar
export const calendarApi = {
  getHolidays: (year: number, token: string) =>
    api<any[]>(`/calendar/holidays/${year}`, { token }),

  checkDates: (fechaInicio: string, fechaFin: string, token: string) =>
    api<{ diasHabiles: number; diasFestivosEnRango: any[] }>('/calendar/check-dates', {
      method: 'POST',
      body: { fechaInicio, fechaFin },
      token,
    }),
};

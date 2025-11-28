export interface Employee {
  id: string;
  employeeId: string;
  nombre: string;
  apellidos: string;
  email: string;
  departamento?: string;
  puesto?: string;
  fechaIngreso: string;
  diasDisponibles: number;
  esAdmin: boolean;
}

export interface VacationRequest {
  id: string;
  employeeId: string;
  fechaInicio: string;
  fechaFin: string;
  diasSolicitados: number;
  tipoLicencia: TipoLicencia;
  motivo?: string;
  estado: EstadoSolicitud;
  comentariosRh?: string;
  aprobadoPor?: string;
  fechaAprobacion?: string;
  createdAt: string;
  employee?: Employee;
}

export enum TipoLicencia {
  VACACIONES = 'vacaciones',
  MATERNIDAD = 'maternidad',
  PATERNIDAD = 'paternidad',
  INCAPACIDAD = 'incapacidad',
  ADOPCION = 'adopcion',
  LUTO = 'luto',
  MATRIMONIO = 'matrimonio',
  OTRO = 'otro',
}

export enum EstadoSolicitud {
  PENDIENTE = 'pendiente',
  APROBADA = 'aprobada',
  RECHAZADA = 'rechazada',
  CANCELADA = 'cancelada',
}

export interface Holiday {
  id: string;
  fecha: string;
  nombre: string;
  tipo: string;
  anio: number;
}

export interface Balance {
  diasTotales: number;
  diasUsados: number;
  diasDisponibles: number;
  antiguedad: number;
}

import { TipoFestivo } from '../entities/holiday.entity';

export interface HolidayData {
  fecha: string; // YYYY-MM-DD
  nombre: string;
  tipo: TipoFestivo;
  anio: number;
}

/**
 * Días festivos oficiales de México según la Ley Federal del Trabajo (LFT)
 * Artículo 74: Días de descanso obligatorio
 *
 * Los días que caen en fin de semana se trasladan al lunes siguiente
 * según la reforma "días puente" de la LFT
 */
export const MEXICO_HOLIDAYS: HolidayData[] = [
  // ========== 2024 ==========
  { fecha: '2024-01-01', nombre: 'Año Nuevo', tipo: TipoFestivo.OFICIAL, anio: 2024 },
  { fecha: '2024-02-05', nombre: 'Día de la Constitución', tipo: TipoFestivo.OFICIAL, anio: 2024 },
  { fecha: '2024-03-18', nombre: 'Natalicio de Benito Juárez', tipo: TipoFestivo.OFICIAL, anio: 2024 },
  { fecha: '2024-05-01', nombre: 'Día del Trabajo', tipo: TipoFestivo.OFICIAL, anio: 2024 },
  { fecha: '2024-09-16', nombre: 'Día de la Independencia', tipo: TipoFestivo.OFICIAL, anio: 2024 },
  { fecha: '2024-11-18', nombre: 'Revolución Mexicana', tipo: TipoFestivo.OFICIAL, anio: 2024 },
  { fecha: '2024-12-25', nombre: 'Navidad', tipo: TipoFestivo.OFICIAL, anio: 2024 },

  // ========== 2025 ==========
  { fecha: '2025-01-01', nombre: 'Año Nuevo', tipo: TipoFestivo.OFICIAL, anio: 2025 },
  { fecha: '2025-02-03', nombre: 'Día de la Constitución', tipo: TipoFestivo.OFICIAL, anio: 2025 },
  { fecha: '2025-03-17', nombre: 'Natalicio de Benito Juárez', tipo: TipoFestivo.OFICIAL, anio: 2025 },
  { fecha: '2025-05-01', nombre: 'Día del Trabajo', tipo: TipoFestivo.OFICIAL, anio: 2025 },
  { fecha: '2025-09-16', nombre: 'Día de la Independencia', tipo: TipoFestivo.OFICIAL, anio: 2025 },
  { fecha: '2025-11-17', nombre: 'Revolución Mexicana', tipo: TipoFestivo.OFICIAL, anio: 2025 },
  { fecha: '2025-12-25', nombre: 'Navidad', tipo: TipoFestivo.OFICIAL, anio: 2025 },

  // ========== 2026 ==========
  { fecha: '2026-01-01', nombre: 'Año Nuevo', tipo: TipoFestivo.OFICIAL, anio: 2026 },
  { fecha: '2026-02-02', nombre: 'Día de la Constitución', tipo: TipoFestivo.OFICIAL, anio: 2026 },
  { fecha: '2026-03-16', nombre: 'Natalicio de Benito Juárez', tipo: TipoFestivo.OFICIAL, anio: 2026 },
  { fecha: '2026-05-01', nombre: 'Día del Trabajo', tipo: TipoFestivo.OFICIAL, anio: 2026 },
  { fecha: '2026-09-16', nombre: 'Día de la Independencia', tipo: TipoFestivo.OFICIAL, anio: 2026 },
  { fecha: '2026-11-16', nombre: 'Revolución Mexicana', tipo: TipoFestivo.OFICIAL, anio: 2026 },
  { fecha: '2026-12-25', nombre: 'Navidad', tipo: TipoFestivo.OFICIAL, anio: 2026 },
];

/**
 * Días de vacaciones según antigüedad (LFT Art. 76)
 * Reformado en 2023: Se aumentaron los días mínimos
 */
export const VACATION_DAYS_BY_SENIORITY: Record<number, number> = {
  1: 12, // Primer año: 12 días
  2: 14, // Segundo año: 14 días
  3: 16, // Tercer año: 16 días
  4: 18, // Cuarto año: 18 días
  5: 20, // Quinto año: 20 días
  // A partir del 6° año se incrementan 2 días por cada 5 años
  6: 22,
  7: 22,
  8: 22,
  9: 22,
  10: 22,
  11: 24,
  12: 24,
  13: 24,
  14: 24,
  15: 24,
  16: 26,
  17: 26,
  18: 26,
  19: 26,
  20: 26,
  // 21+ años: 28 días
};

/**
 * Calcula los días de vacaciones según años de antigüedad
 */
export function calcularDiasVacaciones(aniosAntiguedad: number): number {
  if (aniosAntiguedad <= 0) return 0;
  if (aniosAntiguedad <= 20) {
    return VACATION_DAYS_BY_SENIORITY[aniosAntiguedad] || 12;
  }
  // Más de 20 años: 28 días base
  return 28;
}

/**
 * Reglas de licencias según la Ley Federal del Trabajo
 */
export const LICENSE_RULES = {
  maternidad: {
    dias: 84, // 42 antes + 42 después del parto
    descripcion: 'Licencia de maternidad (Art. 170 LFT)',
    requiereDocumento: true,
  },
  paternidad: {
    dias: 5,
    descripcion: 'Licencia de paternidad (Art. 132 LFT)',
    requiereDocumento: true,
  },
  adopcion: {
    dias: 42, // Similar a maternidad
    descripcion: 'Licencia por adopción',
    requiereDocumento: true,
  },
  luto: {
    dias: 3, // Según política común (no está en LFT)
    descripcion: 'Permiso por fallecimiento de familiar directo',
    requiereDocumento: true,
  },
  matrimonio: {
    dias: 3, // Según política común (no está en LFT)
    descripcion: 'Permiso por matrimonio',
    requiereDocumento: true,
  },
};

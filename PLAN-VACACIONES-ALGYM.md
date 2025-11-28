# Plan de Desarrollo: Sistema de Gestión de Vacaciones ALGYM

## Resumen Ejecutivo

Sistema de gestión de vacaciones para empleados de ALGYM con:
- Calendario interactivo con días festivos de México precargados
- Integración bidireccional con Monday.com
- Notificaciones por correo a RH (abril@algym247.com)
- Cálculo automático de días según antigüedad (Ley Federal del Trabajo)
- Autenticación de empleados
- Preparado para integración futura con sitio web principal

---

## Stack Tecnológico Recomendado

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  Next.js 14 + React 18 + TypeScript + Tailwind CSS          │
│  (Consistente con proyecto ALGYM247 existente)              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API ROUTES                              │
│  Next.js API Routes (serverless functions)                   │
│  - /api/auth/* → Autenticación                              │
│  - /api/vacations/* → CRUD solicitudes                      │
│  - /api/employees/* → Gestión empleados                     │
│  - /api/monday/* → Webhooks y sincronización                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     BASE DE DATOS                            │
│  Firebase Firestore                                          │
│  - employees (datos, antigüedad, saldo vacaciones)          │
│  - vacation_requests (solicitudes)                          │
│  - holidays (días festivos configurables)                   │
│  - settings (configuración global)                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    INTEGRACIONES                             │
│  Monday.com API → Tablero de solicitudes                    │
│  Gmail API / Nodemailer → Notificaciones                    │
│  n8n (opcional) → Automatizaciones avanzadas                │
└─────────────────────────────────────────────────────────────┘
```

---

## Arquitectura de la Aplicación

### Estructura de Carpetas

```
vacaciones-algym/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Dashboard principal
│   │   ├── calendario/page.tsx         # Calendario de vacaciones
│   │   ├── mis-solicitudes/page.tsx    # Historial del empleado
│   │   └── perfil/page.tsx             # Perfil del empleado
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── page.tsx                    # Dashboard admin
│   │   ├── solicitudes/page.tsx        # Aprobar/rechazar
│   │   ├── empleados/page.tsx          # Gestión de empleados
│   │   └── festivos/page.tsx           # Configurar días festivos
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   ├── logout/route.ts
│   │   │   └── me/route.ts
│   │   ├── employees/
│   │   │   ├── route.ts                # GET, POST
│   │   │   ├── [id]/route.ts           # GET, PUT, DELETE
│   │   │   └── sync-monday/route.ts    # Sincronizar con Monday
│   │   ├── vacations/
│   │   │   ├── route.ts                # GET, POST
│   │   │   ├── [id]/route.ts           # GET, PUT, DELETE
│   │   │   ├── [id]/approve/route.ts   # Aprobar solicitud
│   │   │   └── [id]/reject/route.ts    # Rechazar solicitud
│   │   ├── holidays/
│   │   │   └── route.ts                # CRUD días festivos
│   │   ├── monday/
│   │   │   ├── webhook/route.ts        # Recibir webhooks
│   │   │   └── sync/route.ts           # Sincronización manual
│   │   └── notifications/
│   │       └── route.ts                # Enviar correos
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                        # Redirect a login/dashboard
├── components/
│   ├── ui/                             # Componentes shadcn/ui
│   ├── calendar/
│   │   ├── vacation-calendar.tsx       # Calendario principal
│   │   ├── day-cell.tsx                # Celda del día
│   │   └── legend.tsx                  # Leyenda de colores
│   ├── forms/
│   │   ├── vacation-request-form.tsx   # Formulario de solicitud
│   │   └── employee-form.tsx           # Formulario de empleado
│   ├── dashboard/
│   │   ├── stats-cards.tsx             # Tarjetas de estadísticas
│   │   ├── recent-requests.tsx         # Solicitudes recientes
│   │   └── vacation-balance.tsx        # Saldo de vacaciones
│   └── layout/
│       ├── header.tsx
│       ├── sidebar.tsx
│       └── mobile-nav.tsx
├── lib/
│   ├── firebase/
│   │   ├── config.ts                   # Configuración Firebase
│   │   ├── auth.ts                     # Funciones de autenticación
│   │   └── db.ts                       # Funciones de Firestore
│   ├── monday/
│   │   ├── client.ts                   # Cliente API Monday
│   │   ├── queries.ts                  # Queries GraphQL
│   │   └── mutations.ts                # Mutations GraphQL
│   ├── email/
│   │   ├── templates.ts                # Templates de correo
│   │   └── sender.ts                   # Envío de correos
│   ├── utils/
│   │   ├── dates.ts                    # Utilidades de fechas
│   │   ├── vacation-calculator.ts      # Cálculo días por antigüedad
│   │   └── validators.ts               # Validaciones
│   └── constants/
│       ├── holidays-mexico.ts          # Días festivos México
│       └── vacation-rules.ts           # Reglas de negocio
├── hooks/
│   ├── use-auth.ts
│   ├── use-vacations.ts
│   └── use-employees.ts
├── types/
│   ├── employee.ts
│   ├── vacation.ts
│   ├── holiday.ts
│   └── monday.ts
├── middleware.ts                       # Protección de rutas
└── .env.local                          # Variables de entorno
```

---

## Modelos de Datos

### 1. Empleado (Employee)

```typescript
interface Employee {
  id: string;                    // ID Firebase
  mondayItemId?: string;         // ID en Monday.com

  // Datos personales
  name: string;
  email: string;
  phone?: string;
  department?: string;
  position?: string;

  // Datos de contrato
  hireDate: Date;                // Fecha de ingreso
  contractType: 'full-time' | 'part-time';

  // Vacaciones
  vacationDaysEntitled: number;  // Días que le corresponden (calculado)
  vacationDaysUsed: number;      // Días utilizados
  vacationDaysRemaining: number; // Días disponibles

  // Autenticación
  passwordHash: string;
  role: 'employee' | 'admin';
  isActive: boolean;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}
```

### 2. Solicitud de Vacaciones (VacationRequest)

```typescript
interface VacationRequest {
  id: string;                    // ID Firebase
  mondayItemId?: string;         // ID en Monday.com

  // Relación
  employeeId: string;
  employeeName: string;          // Denormalizado para consultas
  employeeEmail: string;

  // Fechas
  startDate: Date;
  endDate: Date;
  isHalfDay: boolean;            // Si es medio día
  halfDayPeriod?: 'morning' | 'afternoon';

  // Cálculo
  workingDaysRequested: number;  // Días hábiles (sin festivos/fines de semana)

  // Estado
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';

  // Aprobación
  reviewedBy?: string;           // ID del admin que revisó
  reviewedAt?: Date;
  rejectionReason?: string;

  // Notas
  employeeNotes?: string;        // Comentarios del empleado
  adminNotes?: string;           // Comentarios del admin

  // Metadata
  createdAt: Date;
  updatedAt: Date;
}
```

### 3. Día Festivo (Holiday)

```typescript
interface Holiday {
  id: string;
  date: Date;
  name: string;
  type: 'official' | 'company';  // Oficial México o propio de empresa
  isRecurring: boolean;          // Se repite cada año
  year?: number;                 // Si no es recurrente
}
```

---

## Días Festivos Oficiales de México (Precargados)

```typescript
// lib/constants/holidays-mexico.ts

export const MEXICO_OFFICIAL_HOLIDAYS = [
  // Días de descanso obligatorio (LFT Art. 74)
  { month: 1, day: 1, name: "Año Nuevo", official: true },
  { month: 2, day: 5, name: "Día de la Constitución", official: true, adjustToMonday: true },
  { month: 3, day: 21, name: "Natalicio de Benito Juárez", official: true, adjustToMonday: true },
  { month: 5, day: 1, name: "Día del Trabajo", official: true },
  { month: 9, day: 16, name: "Día de la Independencia", official: true },
  { month: 11, day: 20, name: "Revolución Mexicana", official: true, adjustToMonday: true },
  { month: 12, day: 25, name: "Navidad", official: true },

  // Cambio de gobierno federal (cada 6 años: 2024, 2030...)
  // { month: 10, day: 1, name: "Transmisión del Poder Ejecutivo", official: true },

  // Días festivos comunes (no obligatorios pero muchas empresas los dan)
  { month: 2, day: 14, name: "Día del Amor y la Amistad", official: false },
  { month: 5, day: 10, name: "Día de las Madres", official: false },
  { month: 9, day: 15, name: "Grito de Independencia", official: false },
  { month: 11, day: 2, name: "Día de Muertos", official: false },
  { month: 12, day: 12, name: "Día de la Virgen de Guadalupe", official: false },
  { month: 12, day: 24, name: "Nochebuena", official: false },
  { month: 12, day: 31, name: "Fin de Año", official: false },

  // Semana Santa (fechas variables - se calculan cada año)
  // Se calculará dinámicamente
];

// Función para calcular Semana Santa
export function getHolyWeek(year: number): { jueveSanto: Date; viernesSanto: Date } {
  // Algoritmo para calcular Pascua y derivar Jueves/Viernes Santo
}
```

---

## Cálculo de Vacaciones según Ley Federal del Trabajo

```typescript
// lib/utils/vacation-calculator.ts

/**
 * Artículo 76 LFT (Reforma 2023):
 *
 * Años trabajados | Días de vacaciones
 * ----------------|-------------------
 * 1 año           | 12 días
 * 2 años          | 14 días
 * 3 años          | 16 días
 * 4 años          | 18 días
 * 5 años          | 20 días
 * 6-10 años       | 22 días
 * 11-15 años      | 24 días
 * 16-20 años      | 26 días
 * 21-25 años      | 28 días
 * 26-30 años      | 30 días
 * 31-35 años      | 32 días
 */

export function calculateVacationDays(yearsWorked: number): number {
  if (yearsWorked < 1) return 0;
  if (yearsWorked === 1) return 12;
  if (yearsWorked === 2) return 14;
  if (yearsWorked === 3) return 16;
  if (yearsWorked === 4) return 18;
  if (yearsWorked === 5) return 20;
  if (yearsWorked <= 10) return 22;
  if (yearsWorked <= 15) return 24;
  if (yearsWorked <= 20) return 26;
  if (yearsWorked <= 25) return 28;
  if (yearsWorked <= 30) return 30;
  return 32;
}

export function calculateYearsWorked(hireDate: Date): number {
  const today = new Date();
  let years = today.getFullYear() - hireDate.getFullYear();
  const monthDiff = today.getMonth() - hireDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < hireDate.getDate())) {
    years--;
  }

  return Math.max(0, years);
}
```

---

## Flujo de Solicitud de Vacaciones

```
┌─────────────────────────────────────────────────────────────────┐
│                     EMPLEADO                                     │
│  1. Inicia sesión en la aplicación                              │
│  2. Ve el calendario con días festivos marcados                 │
│  3. Selecciona fechas de vacaciones                             │
│  4. Sistema valida:                                              │
│     - Mínimo 3 días de anticipación                             │
│     - Días disponibles suficientes                              │
│     - No más de 2 empleados del gimnasio simultáneamente        │
│  5. Envía solicitud                                              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SISTEMA                                      │
│  1. Guarda solicitud en Firebase (status: 'pending')            │
│  2. Crea item en Monday.com (tablero de vacaciones)             │
│  3. Envía correo a abril@algym247.com con:                      │
│     - Datos del empleado                                         │
│     - Fechas solicitadas                                         │
│     - Días a descontar                                           │
│     - Enlace al formulario de aprobación                        │
│  4. Notifica al empleado que su solicitud fue enviada           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     DIRECTORA RH                                 │
│  1. Recibe correo con solicitud                                 │
│  2. Revisa en Monday.com o en panel admin                       │
│  3. Aprueba o rechaza (con formulario)                          │
│  4. Si rechaza, indica motivo                                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     SISTEMA (Post-aprobación)                    │
│  1. Actualiza status en Firebase                                 │
│  2. Sincroniza con Monday.com                                    │
│  3. Si aprobada: descuenta días del saldo del empleado          │
│  4. Envía correo de confirmación al empleado                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Integración con Monday.com

### Tablero de Vacaciones (Estructura propuesta)

| Columna | Tipo | Descripción |
|---------|------|-------------|
| Nombre | Text (name) | Nombre del empleado |
| Email | Email | Correo del empleado |
| Fecha Inicio | Date | Inicio de vacaciones |
| Fecha Fin | Date | Fin de vacaciones |
| Días Solicitados | Numbers | Cantidad de días hábiles |
| Medio Día | Checkbox | Si es medio día |
| Estado | Status | Pendiente / Aprobada / Rechazada / Cancelada |
| Notas Empleado | Long Text | Comentarios del empleado |
| Notas Admin | Long Text | Comentarios de RH |
| Fecha Solicitud | Date | Cuándo se solicitó |
| Aprobado Por | Text | Quién aprobó/rechazó |

### Sincronización

```typescript
// lib/monday/mutations.ts

export async function createVacationRequest(request: VacationRequest): Promise<string> {
  const columnValues = {
    email: { email: request.employeeEmail, text: request.employeeEmail },
    date: { date: request.startDate.toISOString().split('T')[0] },
    date0: { date: request.endDate.toISOString().split('T')[0] },
    numbers: request.workingDaysRequested,
    checkbox: { checked: request.isHalfDay },
    status: { label: 'Pendiente' },
    long_text: { text: request.employeeNotes || '' },
    date4: { date: new Date().toISOString().split('T')[0] },
  };

  const query = `
    mutation {
      create_item (
        board_id: ${MONDAY_VACATIONS_BOARD_ID},
        item_name: "${request.employeeName}",
        column_values: "${escapeForGraphQL(JSON.stringify(columnValues))}"
      ) {
        id
      }
    }
  `;

  // ... ejecutar mutation
}

export async function updateVacationStatus(
  mondayItemId: string,
  status: 'approved' | 'rejected',
  reviewerName: string,
  notes?: string
): Promise<void> {
  // Actualizar status en Monday
}
```

---

## Integración con Correo (Gmail/Google Workspace)

### Opción 1: Nodemailer con Gmail SMTP (Recomendada para inicio)

```typescript
// lib/email/sender.ts

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Contraseña de aplicación
  },
});

export async function sendVacationRequestEmail(request: VacationRequest): Promise<void> {
  const approvalLink = `${process.env.NEXT_PUBLIC_APP_URL}/admin/solicitudes/${request.id}`;

  await transporter.sendMail({
    from: '"Sistema de Vacaciones ALGYM" <noreply@algym247.com>',
    to: 'abril@algym247.com',
    subject: `Nueva Solicitud de Vacaciones - ${request.employeeName}`,
    html: `
      <h2>Nueva Solicitud de Vacaciones</h2>
      <p><strong>Empleado:</strong> ${request.employeeName}</p>
      <p><strong>Email:</strong> ${request.employeeEmail}</p>
      <p><strong>Fechas:</strong> ${formatDate(request.startDate)} - ${formatDate(request.endDate)}</p>
      <p><strong>Días solicitados:</strong> ${request.workingDaysRequested}</p>
      ${request.isHalfDay ? '<p><strong>Tipo:</strong> Medio día</p>' : ''}
      ${request.employeeNotes ? `<p><strong>Notas:</strong> ${request.employeeNotes}</p>` : ''}

      <br>
      <a href="${approvalLink}" style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
        Revisar Solicitud
      </a>
    `,
  });
}
```

### Opción 2: n8n (Para automatizaciones más complejas)

Se puede configurar un workflow en n8n que:
1. Escuche webhooks de la aplicación
2. Envíe correos personalizados
3. Actualice Monday.com
4. Maneje recordatorios

---

## Reglas de Negocio Implementadas

### 1. Validación de Solicitud

```typescript
// lib/utils/validators.ts

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export async function validateVacationRequest(
  request: Partial<VacationRequest>,
  employee: Employee
): Promise<ValidationResult> {
  const errors: string[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Mínimo 3 días de anticipación
  const startDate = new Date(request.startDate!);
  const daysUntilStart = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (daysUntilStart < 3) {
    errors.push('Las vacaciones deben solicitarse con al menos 3 días de anticipación');
  }

  // 2. Días suficientes disponibles
  const workingDays = await calculateWorkingDays(request.startDate!, request.endDate!, request.isHalfDay);
  if (workingDays > employee.vacationDaysRemaining) {
    errors.push(`No tienes suficientes días disponibles. Disponibles: ${employee.vacationDaysRemaining}, Solicitados: ${workingDays}`);
  }

  // 3. Máximo 2 empleados del gimnasio simultáneamente
  const overlappingRequests = await getOverlappingApprovedRequests(request.startDate!, request.endDate!);
  if (overlappingRequests.length >= 2) {
    errors.push('Ya hay 2 empleados con vacaciones aprobadas en esas fechas');
  }

  // 4. Fecha fin después de fecha inicio
  if (new Date(request.endDate!) < new Date(request.startDate!)) {
    errors.push('La fecha de fin debe ser posterior a la fecha de inicio');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
```

### 2. Cálculo de Días Hábiles

```typescript
// lib/utils/dates.ts

export async function calculateWorkingDays(
  startDate: Date,
  endDate: Date,
  isHalfDay: boolean = false
): Promise<number> {
  if (isHalfDay) return 0.5;

  const holidays = await getHolidays(startDate.getFullYear());
  let workingDays = 0;
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = holidays.some(h => isSameDay(h.date, currentDate));

    if (!isWeekend && !isHoliday) {
      workingDays++;
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return workingDays;
}
```

---

## Fases de Desarrollo

### Fase 1: Infraestructura Base (Semana 1)
- [ ] Crear proyecto Next.js con estructura de carpetas
- [ ] Configurar Firebase (Firestore + Auth)
- [ ] Configurar variables de entorno
- [ ] Implementar componentes UI base (shadcn/ui)
- [ ] Crear layout de la aplicación

### Fase 2: Autenticación y Empleados (Semana 2)
- [ ] Sistema de login para empleados
- [ ] Panel de administración para crear empleados
- [ ] Sincronización inicial con Monday (importar empleados)
- [ ] Cálculo automático de días por antigüedad
- [ ] Middleware de protección de rutas

### Fase 3: Calendario y Solicitudes (Semana 3)
- [ ] Componente de calendario interactivo
- [ ] Cargar días festivos de México
- [ ] Formulario de solicitud de vacaciones
- [ ] Validaciones de reglas de negocio
- [ ] Guardar solicitudes en Firebase

### Fase 4: Integración Monday.com (Semana 4)
- [ ] Crear/actualizar items en Monday al solicitar
- [ ] Sincronización bidireccional de estados
- [ ] Webhook para recibir cambios de Monday
- [ ] Panel de administración con vista de solicitudes

### Fase 5: Notificaciones y Aprobación (Semana 5)
- [ ] Envío de correos con Nodemailer/Gmail
- [ ] Formulario de aprobación para RH
- [ ] Notificaciones al empleado (aprobado/rechazado)
- [ ] Actualización automática de saldo de días

### Fase 6: Pulido y Despliegue (Semana 6)
- [ ] Testing de flujos completos
- [ ] Optimización de rendimiento
- [ ] Documentación de API
- [ ] Despliegue en Vercel
- [ ] Configuración de dominio

---

## Variables de Entorno Requeridas

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_ADMIN_PRIVATE_KEY=
FIREBASE_ADMIN_CLIENT_EMAIL=

# Monday.com
MONDAY_API_TOKEN=
MONDAY_VACATIONS_BOARD_ID=
MONDAY_EMPLOYEES_BOARD_ID=

# Email (Gmail)
GMAIL_USER=
GMAIL_APP_PASSWORD=
RH_EMAIL=abril@algym247.com

# App
NEXT_PUBLIC_APP_URL=https://vacaciones.algym247.com
JWT_SECRET=
```

---

## Interfaz de Usuario (Wireframes Conceptuales)

### Dashboard del Empleado
```
┌────────────────────────────────────────────────────────────┐
│  🏠 ALGYM Vacaciones                    👤 Juan Pérez ▼    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ 📅 Días     │ │ ✅ Usados   │ │ ⏳ Pendiente│          │
│  │ Disponibles │ │             │ │             │          │
│  │     8       │ │     4       │ │     2       │          │
│  └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                            │
│  ┌──────────────────────────────────────────────────────┐ │
│  │              CALENDARIO - ENERO 2025                  │ │
│  │  Lu   Ma   Mi   Ju   Vi   Sá   Do                    │ │
│  │       1🔴  2    3    4    5    6                      │ │
│  │  7    8    9    10   11   12   13                     │ │
│  │  ...                                                  │ │
│  │                                                       │ │
│  │  🔴 Festivo   🟢 Disponible   🟡 Tu solicitud        │ │
│  │  🔵 Otro empleado                                     │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
│  [ + Nueva Solicitud de Vacaciones ]                      │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Panel de Administración (RH)
```
┌────────────────────────────────────────────────────────────┐
│  🏠 ALGYM Vacaciones - Admin            👤 Abril ▼         │
├────────────────────────────────────────────────────────────┤
│  📋 Solicitudes │ 👥 Empleados │ 📅 Festivos │ ⚙️ Config   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Solicitudes Pendientes (3)                                │
│  ┌────────────────────────────────────────────────────┐   │
│  │ Juan Pérez        15-20 Enero 2025    4 días       │   │
│  │ ⏳ Pendiente      [✅ Aprobar] [❌ Rechazar]       │   │
│  ├────────────────────────────────────────────────────┤   │
│  │ María García      22-24 Enero 2025    2 días       │   │
│  │ ⏳ Pendiente      [✅ Aprobar] [❌ Rechazar]       │   │
│  └────────────────────────────────────────────────────┘   │
│                                                            │
│  Calendario General                                        │
│  ┌──────────────────────────────────────────────────────┐ │
│  │  (Vista de todas las vacaciones aprobadas)           │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## Próximos Pasos Inmediatos

1. **Aprobar este plan** - Confirmar que el enfoque es correcto
2. **Crear proyecto base** - Inicializar Next.js con todas las dependencias
3. **Configurar Firebase** - Crear proyecto y obtener credenciales
4. **Configurar Monday** - Crear tablero de vacaciones con estructura propuesta
5. **Desarrollo iterativo** - Implementar fase por fase

---

## Preguntas Pendientes para Confirmar

1. ¿El tablero de Monday para vacaciones ya existe o hay que crearlo?
2. ¿Quieres que los empleados se importen automáticamente de Monday o se cargan manualmente?
3. ¿Hay días adicionales de la empresa que agregar a los festivos oficiales?
4. ¿El dominio será `vacaciones.algym247.com` o un subdirectorio del sitio actual?
5. ¿Necesitas un sistema de recuperación de contraseña para empleados?

---

*Plan generado para ALGYM - Sistema de Gestión de Vacaciones*

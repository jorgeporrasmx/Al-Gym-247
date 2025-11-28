import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { VacationRequest } from '../vacations/entities/vacation-request.entity';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class MondayService {
  private readonly logger = new Logger(MondayService.name);
  private readonly client: AxiosInstance;
  private readonly boardId: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('MONDAY_API_KEY');
    this.boardId = this.configService.get<string>('MONDAY_BOARD_ID', '18174522804');

    this.client = axios.create({
      baseURL: this.configService.get<string>(
        'MONDAY_API_URL',
        'https://api.monday.com/v2',
      ),
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Ejecuta una query GraphQL en Monday.com
   */
  private async query(graphqlQuery: string, variables?: Record<string, any>) {
    try {
      const response = await this.client.post('', {
        query: graphqlQuery,
        variables,
      });

      if (response.data.errors) {
        this.logger.error('Monday API Error:', response.data.errors);
        throw new Error(response.data.errors[0]?.message || 'Error en Monday API');
      }

      return response.data.data;
    } catch (error: any) {
      this.logger.error('Error en Monday API:', error.message);
      throw error;
    }
  }

  /**
   * Crear una solicitud de vacaciones en Monday.com
   * Mapea a las columnas del tablero existente:
   * - Empleado
   * - Periodo de vacaciones
   * - Estado de la solicitud
   * - Tipo de licencia
   * - Días solicitados
   * - Comentarios
   * - Correo de contacto
   */
  async createVacationRequest(
    solicitud: VacationRequest,
    employee: Employee,
  ): Promise<string> {
    const fechaInicio = new Date(solicitud.fechaInicio);
    const fechaFin = new Date(solicitud.fechaFin);

    // Formatear fechas para Monday (YYYY-MM-DD)
    const startDate = fechaInicio.toISOString().split('T')[0];
    const endDate = fechaFin.toISOString().split('T')[0];

    // Mapear tipo de licencia a español
    const tipoLicenciaMap: Record<string, string> = {
      vacaciones: 'Vacaciones',
      maternidad: 'Maternidad',
      paternidad: 'Paternidad',
      incapacidad: 'Incapacidad',
      adopcion: 'Adopción',
      luto: 'Luto',
      matrimonio: 'Matrimonio',
      otro: 'Otro',
    };

    // Valores de las columnas según la estructura del tablero
    // NOTA: Los IDs de columna pueden variar, estos son ejemplos comunes
    const columnValues = {
      // Periodo de vacaciones (date range)
      date4: { from: startDate, to: endDate },
      // Estado de la solicitud (status)
      status: { label: 'Pendiente' },
      // Tipo de licencia (dropdown o text)
      text: tipoLicenciaMap[solicitud.tipoLicencia] || 'Vacaciones',
      // Días solicitados (number)
      numbers: solicitud.diasSolicitados,
      // Comentarios (long text)
      long_text: { text: solicitud.motivo || '' },
      // Correo de contacto (email)
      email: { email: employee.email, text: employee.email },
    };

    const mutation = `
      mutation CreateItem($boardId: ID!, $itemName: String!, $columnValues: JSON!) {
        create_item(
          board_id: $boardId,
          item_name: $itemName,
          column_values: $columnValues
        ) {
          id
        }
      }
    `;

    try {
      const result = await this.query(mutation, {
        boardId: this.boardId,
        itemName: `${employee.nombre} ${employee.apellidos}`,
        columnValues: JSON.stringify(columnValues),
      });

      this.logger.log(`Item creado en Monday: ${result.create_item.id}`);
      return result.create_item.id;
    } catch (error) {
      this.logger.error('Error al crear item en Monday:', error);
      throw error;
    }
  }

  /**
   * Actualizar el estado de una solicitud en Monday
   */
  async updateVacationStatus(
    itemId: string,
    status: 'Pendiente' | 'Aprobada' | 'Rechazada' | 'Cancelada',
  ): Promise<void> {
    if (!itemId) {
      this.logger.warn('No hay itemId de Monday para actualizar');
      return;
    }

    const mutation = `
      mutation UpdateStatus($boardId: ID!, $itemId: ID!, $columnValues: JSON!) {
        change_multiple_column_values(
          board_id: $boardId,
          item_id: $itemId,
          column_values: $columnValues
        ) {
          id
        }
      }
    `;

    const columnValues = {
      status: { label: status },
    };

    try {
      await this.query(mutation, {
        boardId: this.boardId,
        itemId: itemId,
        columnValues: JSON.stringify(columnValues),
      });

      this.logger.log(`Estado actualizado en Monday: ${itemId} -> ${status}`);
    } catch (error) {
      this.logger.error('Error al actualizar estado en Monday:', error);
      throw error;
    }
  }

  /**
   * Actualizar información de aprobación en Monday
   */
  async updateApprovalInfo(
    itemId: string,
    aprobadoPor: string,
    fechaAprobacion: Date,
    comentarios?: string,
  ): Promise<void> {
    if (!itemId) return;

    const mutation = `
      mutation UpdateApproval($boardId: ID!, $itemId: ID!, $columnValues: JSON!) {
        change_multiple_column_values(
          board_id: $boardId,
          item_id: $itemId,
          column_values: $columnValues
        ) {
          id
        }
      }
    `;

    const columnValues: Record<string, any> = {
      // Aprobado por (text)
      text0: aprobadoPor,
      // Fecha de aprobación (date)
      date: { date: fechaAprobacion.toISOString().split('T')[0] },
    };

    if (comentarios) {
      columnValues.long_text = { text: comentarios };
    }

    try {
      await this.query(mutation, {
        boardId: this.boardId,
        itemId: itemId,
        columnValues: JSON.stringify(columnValues),
      });

      this.logger.log(`Información de aprobación actualizada: ${itemId}`);
    } catch (error) {
      this.logger.error('Error al actualizar aprobación en Monday:', error);
    }
  }

  /**
   * Obtener la estructura del tablero (para debugging)
   */
  async getBoardStructure(): Promise<any> {
    const query = `
      query GetBoard($boardId: ID!) {
        boards(ids: [$boardId]) {
          name
          columns {
            id
            title
            type
          }
        }
      }
    `;

    return this.query(query, { boardId: this.boardId });
  }

  /**
   * Verificar conexión con Monday
   */
  async testConnection(): Promise<boolean> {
    try {
      const query = `query { me { name } }`;
      const result = await this.query(query);
      this.logger.log(`Conectado a Monday como: ${result.me.name}`);
      return true;
    } catch (error) {
      this.logger.error('Error de conexión con Monday:', error);
      return false;
    }
  }
}

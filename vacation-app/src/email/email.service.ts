import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { VacationRequest } from '../vacations/entities/vacation-request.entity';
import { Employee } from '../employees/entities/employee.entity';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('SMTP_HOST', 'smtp.gmail.com'),
      port: this.configService.get<number>('SMTP_PORT', 587),
      secure: this.configService.get('SMTP_SECURE') === 'true',
      auth: {
        user: this.configService.get('SMTP_USER'),
        pass: this.configService.get('SMTP_PASS'),
      },
    });
  }

  /**
   * Enviar notificación de nueva solicitud a RH
   */
  async sendNewRequestNotification(
    solicitud: VacationRequest,
    employee: Employee,
  ): Promise<void> {
    const hrEmail = this.configService.get('HR_DIRECTOR_EMAIL');
    const appUrl = this.configService.get('APP_URL', 'http://localhost:3000');
    const approvalLink = `${appUrl}/api/approval/${solicitud.tokenAprobacion}`;

    const fechaInicio = new Date(solicitud.fechaInicio).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const fechaFin = new Date(solicitud.fechaFin).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const tipoLicenciaMap: Record<string, string> = {
      vacaciones: 'Vacaciones',
      maternidad: 'Licencia de Maternidad',
      paternidad: 'Licencia de Paternidad',
      incapacidad: 'Incapacidad',
      adopcion: 'Licencia por Adopción',
      luto: 'Permiso por Luto',
      matrimonio: 'Permiso por Matrimonio',
      otro: 'Otro tipo de permiso',
    };

    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <tr>
      <td>
        <!-- Header -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px 12px 0 0; padding: 30px; text-align: center;">
          <tr>
            <td>
              <h1 style="color: white; margin: 0; font-size: 24px;">Nueva Solicitud de ${tipoLicenciaMap[solicitud.tipoLicencia] || 'Vacaciones'}</h1>
              <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0;">Sistema de Gestión de Vacaciones</p>
            </td>
          </tr>
        </table>

        <!-- Content -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: white; padding: 30px; border-radius: 0 0 12px 12px;">
          <tr>
            <td>
              <p style="color: #333; font-size: 16px; margin: 0 0 20px;">
                <strong>${employee.nombre} ${employee.apellidos}</strong> ha solicitado ${tipoLicenciaMap[solicitud.tipoLicencia]?.toLowerCase() || 'vacaciones'}.
              </p>

              <!-- Info Card -->
              <table width="100%" cellpadding="15" cellspacing="0" style="background: #f8f9fa; border-radius: 8px; margin-bottom: 25px;">
                <tr>
                  <td style="border-bottom: 1px solid #eee;">
                    <span style="color: #666; font-size: 14px;">Empleado</span><br>
                    <strong style="color: #333;">${employee.nombre} ${employee.apellidos}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="border-bottom: 1px solid #eee;">
                    <span style="color: #666; font-size: 14px;">Correo</span><br>
                    <strong style="color: #333;">${employee.email}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="border-bottom: 1px solid #eee;">
                    <span style="color: #666; font-size: 14px;">Departamento</span><br>
                    <strong style="color: #333;">${employee.departamento || 'No especificado'}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="border-bottom: 1px solid #eee;">
                    <span style="color: #666; font-size: 14px;">Período solicitado</span><br>
                    <strong style="color: #333;">${fechaInicio} - ${fechaFin}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="border-bottom: 1px solid #eee;">
                    <span style="color: #666; font-size: 14px;">Días hábiles</span><br>
                    <strong style="color: #333;">${solicitud.diasSolicitados} días</strong>
                  </td>
                </tr>
                ${solicitud.motivo ? `
                <tr>
                  <td>
                    <span style="color: #666; font-size: 14px;">Motivo</span><br>
                    <strong style="color: #333;">${solicitud.motivo}</strong>
                  </td>
                </tr>
                ` : ''}
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="${approvalLink}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; padding: 15px 40px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      Revisar y Aprobar
                    </a>
                  </td>
                </tr>
              </table>

              <p style="color: #999; font-size: 12px; text-align: center; margin: 25px 0 0;">
                Este correo fue enviado automáticamente por el Sistema de Gestión de Vacaciones.<br>
                Si tienes problemas con el botón, copia este enlace: ${approvalLink}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    try {
      await this.transporter.sendMail({
        from: `"Sistema de Vacaciones" <${this.configService.get('SMTP_USER')}>`,
        to: hrEmail,
        subject: `Nueva Solicitud de ${tipoLicenciaMap[solicitud.tipoLicencia] || 'Vacaciones'} - ${employee.nombre} ${employee.apellidos}`,
        html,
      });

      this.logger.log(`Correo enviado a RH: ${hrEmail}`);
    } catch (error) {
      this.logger.error('Error al enviar correo a RH:', error);
      throw error;
    }
  }

  /**
   * Enviar notificación de aprobación/rechazo al empleado
   */
  async sendApprovalNotification(
    solicitud: VacationRequest,
    approved: boolean,
  ): Promise<void> {
    const employee = solicitud.employee;
    if (!employee) {
      this.logger.warn('No se encontró el empleado para notificar');
      return;
    }

    const fechaInicio = new Date(solicitud.fechaInicio).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const fechaFin = new Date(solicitud.fechaFin).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const statusColor = approved ? '#28a745' : '#dc3545';
    const statusText = approved ? 'APROBADA' : 'RECHAZADA';
    const statusEmoji = approved ? '✅' : '❌';

    const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <tr>
      <td>
        <!-- Header -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: ${statusColor}; border-radius: 12px 12px 0 0; padding: 30px; text-align: center;">
          <tr>
            <td>
              <div style="font-size: 48px; margin-bottom: 10px;">${statusEmoji}</div>
              <h1 style="color: white; margin: 0; font-size: 24px;">Solicitud ${statusText}</h1>
            </td>
          </tr>
        </table>

        <!-- Content -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background: white; padding: 30px; border-radius: 0 0 12px 12px;">
          <tr>
            <td>
              <p style="color: #333; font-size: 16px; margin: 0 0 20px;">
                Hola <strong>${employee.nombre}</strong>,
              </p>
              <p style="color: #333; font-size: 16px; margin: 0 0 20px;">
                Tu solicitud de vacaciones ha sido <strong style="color: ${statusColor};">${statusText.toLowerCase()}</strong>.
              </p>

              <!-- Info Card -->
              <table width="100%" cellpadding="15" cellspacing="0" style="background: #f8f9fa; border-radius: 8px; margin-bottom: 25px;">
                <tr>
                  <td style="border-bottom: 1px solid #eee;">
                    <span style="color: #666; font-size: 14px;">Período</span><br>
                    <strong style="color: #333;">${fechaInicio} - ${fechaFin}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="border-bottom: 1px solid #eee;">
                    <span style="color: #666; font-size: 14px;">Días</span><br>
                    <strong style="color: #333;">${solicitud.diasSolicitados} días hábiles</strong>
                  </td>
                </tr>
                ${solicitud.aprobadoPor ? `
                <tr>
                  <td style="border-bottom: 1px solid #eee;">
                    <span style="color: #666; font-size: 14px;">${approved ? 'Aprobado' : 'Rechazado'} por</span><br>
                    <strong style="color: #333;">${solicitud.aprobadoPor}</strong>
                  </td>
                </tr>
                ` : ''}
                ${solicitud.comentariosRh ? `
                <tr>
                  <td>
                    <span style="color: #666; font-size: 14px;">Comentarios de RH</span><br>
                    <strong style="color: #333;">${solicitud.comentariosRh}</strong>
                  </td>
                </tr>
                ` : ''}
              </table>

              ${approved ? `
              <p style="color: #333; font-size: 16px; margin: 0 0 20px;">
                ¡Disfruta tus vacaciones! 🎉
              </p>
              ` : `
              <p style="color: #333; font-size: 16px; margin: 0 0 20px;">
                Si tienes dudas, por favor contacta al departamento de Recursos Humanos.
              </p>
              `}

              <p style="color: #999; font-size: 12px; text-align: center; margin: 25px 0 0;">
                Este correo fue enviado automáticamente por el Sistema de Gestión de Vacaciones.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

    try {
      await this.transporter.sendMail({
        from: `"Sistema de Vacaciones" <${this.configService.get('SMTP_USER')}>`,
        to: employee.email,
        subject: `Tu solicitud de vacaciones ha sido ${statusText.toLowerCase()}`,
        html,
      });

      this.logger.log(`Correo de ${statusText.toLowerCase()} enviado a: ${employee.email}`);
    } catch (error) {
      this.logger.error('Error al enviar correo al empleado:', error);
      throw error;
    }
  }

  /**
   * Verificar conexión SMTP
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.transporter.verify();
      this.logger.log('Conexión SMTP verificada correctamente');
      return true;
    } catch (error) {
      this.logger.error('Error de conexión SMTP:', error);
      return false;
    }
  }
}

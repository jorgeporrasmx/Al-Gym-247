import { Controller, Get, Post, Param, Body, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { VacationsService } from './vacations.service';
import { ConfigService } from '@nestjs/config';

@ApiTags('approval')
@Controller('approval')
export class ApprovalController {
  constructor(
    private readonly vacationsService: VacationsService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Formulario de aprobación accesible via link único
   */
  @Get(':token')
  @ApiOperation({ summary: 'Ver formulario de aprobación (sin autenticación)' })
  @ApiResponse({ status: 200, description: 'Formulario HTML' })
  @ApiResponse({ status: 404, description: 'Token inválido' })
  async showApprovalForm(
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    try {
      const solicitud = await this.vacationsService.findByToken(token);
      const employee = solicitud.employee;

      // Generar HTML del formulario
      const html = this.generateApprovalFormHtml(solicitud, employee, token);
      res.setHeader('Content-Type', 'text/html');
      res.send(html);
    } catch (error) {
      res.status(404).send(this.generateErrorHtml('Enlace de aprobación inválido o expirado'));
    }
  }

  /**
   * Procesar aprobación/rechazo desde el formulario
   */
  @Post(':token')
  @ApiOperation({ summary: 'Procesar aprobación/rechazo' })
  @ApiResponse({ status: 200, description: 'Solicitud procesada' })
  async processApproval(
    @Param('token') token: string,
    @Body() body: { accion: 'aprobar' | 'rechazar'; comentarios?: string },
    @Res() res: Response,
  ) {
    try {
      const solicitud = await this.vacationsService.findByToken(token);

      if (solicitud.estado !== 'pendiente') {
        return res.send(
          this.generateResultHtml(
            'Esta solicitud ya fue procesada anteriormente',
            false,
          ),
        );
      }

      const hrEmail = this.configService.get('HR_DIRECTOR_EMAIL');
      const hrName = this.configService.get('HR_DIRECTOR_NAME', 'Directora de RH');

      if (body.accion === 'aprobar') {
        await this.vacationsService.approve(
          solicitud.id,
          hrName,
          body.comentarios,
        );
        res.send(this.generateResultHtml('Solicitud aprobada exitosamente', true));
      } else {
        await this.vacationsService.reject(
          solicitud.id,
          hrName,
          body.comentarios,
        );
        res.send(this.generateResultHtml('Solicitud rechazada', true));
      }
    } catch (error) {
      res.status(400).send(
        this.generateErrorHtml('Error al procesar la solicitud'),
      );
    }
  }

  private generateApprovalFormHtml(
    solicitud: any,
    employee: any,
    token: string,
  ): string {
    const fechaInicio = new Date(solicitud.fechaInicio).toLocaleDateString('es-MX');
    const fechaFin = new Date(solicitud.fechaFin).toLocaleDateString('es-MX');

    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Aprobación de Vacaciones - Su Tilde</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); overflow: hidden; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
    .header h1 { font-size: 24px; margin-bottom: 5px; }
    .header p { opacity: 0.9; }
    .content { padding: 30px; }
    .info-card { background: #f8f9fa; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
    .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
    .info-row:last-child { border-bottom: none; }
    .info-label { color: #666; font-size: 14px; }
    .info-value { font-weight: 600; color: #333; }
    .form-group { margin-bottom: 20px; }
    .form-group label { display: block; margin-bottom: 8px; font-weight: 500; color: #333; }
    .form-group textarea { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px; font-size: 14px; resize: vertical; min-height: 80px; }
    .buttons { display: flex; gap: 15px; margin-top: 25px; }
    .btn { flex: 1; padding: 15px; border: none; border-radius: 8px; font-size: 16px; font-weight: 600; cursor: pointer; transition: transform 0.2s, opacity 0.2s; }
    .btn:hover { transform: translateY(-2px); }
    .btn:active { transform: translateY(0); }
    .btn-approve { background: #28a745; color: white; }
    .btn-reject { background: #dc3545; color: white; }
    .badge { display: inline-block; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; }
    .badge-pending { background: #fff3cd; color: #856404; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Solicitud de Vacaciones</h1>
      <p>Sistema de Gestión de Vacaciones - Su Tilde</p>
    </div>
    <div class="content">
      <div class="info-card">
        <div class="info-row">
          <span class="info-label">Empleado</span>
          <span class="info-value">${employee.nombre} ${employee.apellidos}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Correo</span>
          <span class="info-value">${employee.email}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Departamento</span>
          <span class="info-value">${employee.departamento || 'No especificado'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Tipo</span>
          <span class="info-value">${solicitud.tipoLicencia}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Período</span>
          <span class="info-value">${fechaInicio} - ${fechaFin}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Días solicitados</span>
          <span class="info-value">${solicitud.diasSolicitados} días hábiles</span>
        </div>
        <div class="info-row">
          <span class="info-label">Motivo</span>
          <span class="info-value">${solicitud.motivo || 'No especificado'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Estado</span>
          <span class="badge badge-pending">Pendiente</span>
        </div>
      </div>

      <form id="approvalForm" method="POST" action="/api/approval/${token}">
        <div class="form-group">
          <label for="comentarios">Comentarios (opcional)</label>
          <textarea id="comentarios" name="comentarios" placeholder="Escribe un comentario para el empleado..."></textarea>
        </div>

        <div class="buttons">
          <button type="submit" name="accion" value="aprobar" class="btn btn-approve">
            ✓ Aprobar
          </button>
          <button type="submit" name="accion" value="rechazar" class="btn btn-reject">
            ✕ Rechazar
          </button>
        </div>
      </form>
    </div>
  </div>

  <script>
    document.getElementById('approvalForm').addEventListener('submit', async function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const accion = e.submitter.value;

      if (accion === 'rechazar' && !confirm('¿Estás seguro de rechazar esta solicitud?')) {
        return;
      }

      const response = await fetch(this.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accion: accion,
          comentarios: formData.get('comentarios')
        })
      });

      const html = await response.text();
      document.body.innerHTML = html;
    });
  </script>
</body>
</html>`;
  }

  private generateResultHtml(message: string, success: boolean): string {
    const icon = success ? '✓' : '!';
    const color = success ? '#28a745' : '#dc3545';

    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Resultado - Su Tilde</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #f5f5f5; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: white; border-radius: 12px; padding: 40px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 400px; }
    .icon { width: 80px; height: 80px; border-radius: 50%; background: ${color}; color: white; font-size: 40px; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
    h1 { color: #333; margin-bottom: 10px; }
    p { color: #666; }
  </style>
</head>
<body>
  <div class="card">
    <div class="icon">${icon}</div>
    <h1>${success ? '¡Listo!' : 'Atención'}</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;
  }

  private generateErrorHtml(message: string): string {
    return this.generateResultHtml(message, false);
  }
}

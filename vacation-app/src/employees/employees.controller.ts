import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EmployeesService } from './employees.service';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('employees')
@Controller('employees')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Listar todos los empleados (solo admin)' })
  @ApiResponse({ status: 200, description: 'Lista de empleados' })
  @ApiResponse({ status: 403, description: 'Solo administradores' })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get('me')
  @ApiOperation({ summary: 'Obtener mi información' })
  @ApiResponse({ status: 200, description: 'Información del empleado' })
  getMyProfile(@Request() req: any) {
    return this.employeesService.findOne(req.user.id);
  }

  @Get('me/balance')
  @ApiOperation({ summary: 'Obtener mi saldo de vacaciones' })
  @ApiResponse({ status: 200, description: 'Saldo de vacaciones' })
  getMyBalance(@Request() req: any) {
    return this.employeesService.getBalance(req.user.id);
  }

  @Get(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Obtener empleado por ID (solo admin)' })
  @ApiResponse({ status: 200, description: 'Información del empleado' })
  @ApiResponse({ status: 404, description: 'Empleado no encontrado' })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(id);
  }

  @Get(':id/balance')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Obtener saldo de vacaciones por ID (solo admin)' })
  @ApiResponse({ status: 200, description: 'Saldo de vacaciones' })
  getBalance(@Param('id') id: string) {
    return this.employeesService.getBalance(id);
  }

  @Patch(':id')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Actualizar empleado (solo admin)' })
  @ApiResponse({ status: 200, description: 'Empleado actualizado' })
  @ApiResponse({ status: 404, description: 'Empleado no encontrado' })
  update(@Param('id') id: string, @Body() updateDto: UpdateEmployeeDto) {
    return this.employeesService.update(id, updateDto);
  }
}

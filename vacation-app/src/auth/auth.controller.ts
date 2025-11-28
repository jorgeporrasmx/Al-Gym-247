import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Employee } from '../employees/entities/employee.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registrar nuevo empleado' })
  @ApiResponse({ status: 201, description: 'Empleado registrado exitosamente' })
  @ApiResponse({ status: 409, description: 'El correo ya está registrado' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener información del usuario actual' })
  @ApiResponse({ status: 200, description: 'Información del usuario' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async getProfile(@Request() req: any) {
    const { password, ...employee } = req.user;
    return employee;
  }

  @Get('seed')
  @ApiOperation({ summary: 'Crear usuarios de prueba' })
  @ApiResponse({ status: 200, description: 'Usuarios creados' })
  async seed() {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('test123', salt);

    // Usuario empleado - buscar por email O por employeeId
    let empleado = await this.employeeRepository.findOne({
      where: [
        { email: 'empleado@algym247.com' },
        { employeeId: 'EMP001' },
      ],
    });

    if (!empleado) {
      empleado = this.employeeRepository.create({
        employeeId: 'EMP001',
        nombre: 'Usuario',
        apellidos: 'Prueba',
        email: 'empleado@algym247.com',
        password: passwordHash,
        departamento: 'Gimnasio',
        puesto: 'Entrenador',
        fechaIngreso: new Date('2023-01-15'),
        diasVacacionesAnuales: 12,
        diasDisponibles: 10,
        diasUsados: 2,
        activo: true,
        esAdmin: false,
      });
      await this.employeeRepository.save(empleado);
    } else {
      empleado.email = 'empleado@algym247.com';
      empleado.diasDisponibles = 10;
      empleado.password = passwordHash;
      empleado.activo = true;
      empleado.esAdmin = false;
      await this.employeeRepository.save(empleado);
    }

    // Usuario admin (RH) - buscar por email O por employeeId
    let admin = await this.employeeRepository.findOne({
      where: [
        { email: 'abril@algym247.com' },
        { employeeId: 'RH001' },
      ],
    });

    if (!admin) {
      admin = this.employeeRepository.create({
        employeeId: 'RH001',
        nombre: 'Abril',
        apellidos: 'García',
        email: 'abril@algym247.com',
        password: passwordHash,
        departamento: 'Recursos Humanos',
        puesto: 'Directora de RH',
        fechaIngreso: new Date('2020-03-01'),
        diasVacacionesAnuales: 18,
        diasDisponibles: 15,
        diasUsados: 3,
        activo: true,
        esAdmin: true,
      });
      await this.employeeRepository.save(admin);
    } else {
      admin.nombre = 'Abril';
      admin.apellidos = 'García';
      admin.email = 'abril@algym247.com';
      admin.puesto = 'Directora de RH';
      admin.esAdmin = true;
      admin.diasDisponibles = 15;
      admin.password = passwordHash;
      admin.activo = true;
      await this.employeeRepository.save(admin);
    }

    return {
      message: 'Usuarios de prueba creados exitosamente',
      usuarios: [
        { email: 'empleado@algym247.com', password: 'test123', rol: 'Empleado', diasDisponibles: 10 },
        { email: 'abril@algym247.com', password: 'test123', rol: 'Admin RH', diasDisponibles: 15 },
      ],
    };
  }
}

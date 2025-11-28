import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Employee } from '../employees/entities/employee.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

export interface JwtPayload {
  sub: string;
  email: string;
  nombre: string;
  esAdmin: boolean;
}

export interface AuthResponse {
  accessToken: string;
  employee: {
    id: string;
    nombre: string;
    apellidos: string;
    email: string;
    esAdmin: boolean;
    diasDisponibles: number;
  };
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const { email, password } = loginDto;

    const employee = await this.employeeRepository.findOne({
      where: { email, activo: true },
    });

    if (!employee) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload: JwtPayload = {
      sub: employee.id,
      email: employee.email,
      nombre: `${employee.nombre} ${employee.apellidos}`,
      esAdmin: employee.esAdmin,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      employee: {
        id: employee.id,
        nombre: employee.nombre,
        apellidos: employee.apellidos,
        email: employee.email,
        esAdmin: employee.esAdmin,
        diasDisponibles: Number(employee.diasDisponibles),
      },
    };
  }

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const { email, password, ...rest } = registerDto;

    // Verificar si el email ya existe
    const existingEmployee = await this.employeeRepository.findOne({
      where: { email },
    });

    if (existingEmployee) {
      throw new ConflictException('El correo electrónico ya está registrado');
    }

    // Hash de la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el empleado
    const employee = this.employeeRepository.create({
      ...rest,
      email,
      password: hashedPassword,
      diasDisponibles: rest.diasVacacionesAnuales || 12,
    });

    await this.employeeRepository.save(employee);

    // Generar token
    const payload: JwtPayload = {
      sub: employee.id,
      email: employee.email,
      nombre: `${employee.nombre} ${employee.apellidos}`,
      esAdmin: employee.esAdmin,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      employee: {
        id: employee.id,
        nombre: employee.nombre,
        apellidos: employee.apellidos,
        email: employee.email,
        esAdmin: employee.esAdmin,
        diasDisponibles: Number(employee.diasDisponibles),
      },
    };
  }

  async validateUser(payload: JwtPayload): Promise<Employee | null> {
    const employee = await this.employeeRepository.findOne({
      where: { id: payload.sub, activo: true },
    });
    return employee;
  }
}

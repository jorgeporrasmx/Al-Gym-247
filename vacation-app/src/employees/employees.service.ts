import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { calcularDiasVacaciones } from '../calendar/data/mexico-holidays';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({
      where: { activo: true },
      order: { nombre: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id, activo: true },
      relations: ['solicitudes'],
    });

    if (!employee) {
      throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    }

    return employee;
  }

  async findByEmail(email: string): Promise<Employee | null> {
    return this.employeeRepository.findOne({
      where: { email, activo: true },
    });
  }

  async update(id: string, updateDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.findOne(id);
    Object.assign(employee, updateDto);
    return this.employeeRepository.save(employee);
  }

  async getBalance(id: string): Promise<{
    diasTotales: number;
    diasUsados: number;
    diasDisponibles: number;
    antiguedad: number;
  }> {
    const employee = await this.findOne(id);

    // Calcular antigüedad en años
    const fechaIngreso = new Date(employee.fechaIngreso);
    const hoy = new Date();
    const antiguedadMs = hoy.getTime() - fechaIngreso.getTime();
    const antiguedad = Math.floor(antiguedadMs / (365.25 * 24 * 60 * 60 * 1000));

    // Calcular días de vacaciones según antigüedad
    const diasTotales = calcularDiasVacaciones(antiguedad);

    return {
      diasTotales,
      diasUsados: Number(employee.diasUsados),
      diasDisponibles: Number(employee.diasDisponibles),
      antiguedad,
    };
  }

  async updateVacationBalance(
    id: string,
    diasUsados: number,
  ): Promise<Employee> {
    const employee = await this.findOne(id);
    employee.diasUsados = Number(employee.diasUsados) + diasUsados;
    employee.diasDisponibles = Number(employee.diasDisponibles) - diasUsados;
    return this.employeeRepository.save(employee);
  }

  async resetAnnualVacations(): Promise<void> {
    // Se ejecutaría al inicio de cada año para resetear los días
    const employees = await this.employeeRepository.find({
      where: { activo: true },
    });

    for (const employee of employees) {
      const fechaIngreso = new Date(employee.fechaIngreso);
      const hoy = new Date();
      const antiguedadMs = hoy.getTime() - fechaIngreso.getTime();
      const antiguedad = Math.floor(
        antiguedadMs / (365.25 * 24 * 60 * 60 * 1000),
      );

      employee.diasVacacionesAnuales = calcularDiasVacaciones(antiguedad);
      employee.diasDisponibles = employee.diasVacacionesAnuales;
      employee.diasUsados = 0;
    }

    await this.employeeRepository.save(employees);
  }
}

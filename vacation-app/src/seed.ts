/**
 * Script de Seed para crear usuarios de prueba
 *
 * Ejecutar con: npx ts-node src/seed.ts
 */

import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Employee } from './employees/entities/employee.entity';
import { config } from 'dotenv';

config(); // Cargar variables de entorno

async function seed() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'jorgeporras',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'vacations_db',
    entities: [Employee],
    synchronize: true,
  });

  await dataSource.initialize();
  console.log('Conexión a base de datos establecida');

  const employeeRepo = dataSource.getRepository(Employee);

  // Contraseña hasheada para todos los usuarios de prueba
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('test123', salt);

  // Usuario de prueba con 10 días disponibles
  const empleadoPrueba = await employeeRepo.findOne({
    where: { email: 'empleado@algym247.com' },
  });

  if (empleadoPrueba) {
    empleadoPrueba.diasDisponibles = 10;
    empleadoPrueba.diasVacacionesAnuales = 12;
    empleadoPrueba.diasUsados = 2;
    await employeeRepo.save(empleadoPrueba);
    console.log('✅ Usuario empleado@algym247.com actualizado con 10 días disponibles');
  } else {
    const nuevoEmpleado = employeeRepo.create({
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
    await employeeRepo.save(nuevoEmpleado);
    console.log('✅ Usuario empleado@algym247.com creado con 10 días disponibles');
  }

  // Usuario Admin (Directora RH)
  const adminUsuario = await employeeRepo.findOne({
    where: { email: 'abril@algym247.com' },
  });

  if (adminUsuario) {
    adminUsuario.esAdmin = true;
    adminUsuario.diasDisponibles = 15;
    await employeeRepo.save(adminUsuario);
    console.log('✅ Usuario abril@algym247.com actualizado como Admin');
  } else {
    const nuevoAdmin = employeeRepo.create({
      employeeId: 'RH001',
      nombre: 'Abril',
      apellidos: 'Directora RH',
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
    await employeeRepo.save(nuevoAdmin);
    console.log('✅ Usuario abril@algym247.com creado como Admin');
  }

  // Listar todos los usuarios
  const allEmployees = await employeeRepo.find();
  console.log('\n📋 Usuarios en el sistema:');
  console.log('─'.repeat(70));
  for (const emp of allEmployees) {
    console.log(
      `${emp.esAdmin ? '👑' : '👤'} ${emp.nombre} ${emp.apellidos} | ${emp.email} | Días disponibles: ${emp.diasDisponibles} | Admin: ${emp.esAdmin}`,
    );
  }
  console.log('─'.repeat(70));

  console.log('\n🔑 CREDENCIALES DE PRUEBA:');
  console.log('─'.repeat(40));
  console.log('EMPLEADO:');
  console.log('  Email: empleado@algym247.com');
  console.log('  Password: test123');
  console.log('  Días disponibles: 10');
  console.log('');
  console.log('ADMIN (RH):');
  console.log('  Email: abril@algym247.com');
  console.log('  Password: test123');
  console.log('  Acceso completo al panel de administración');
  console.log('─'.repeat(40));

  await dataSource.destroy();
  console.log('\n✅ Seed completado exitosamente');
}

seed().catch((error) => {
  console.error('Error en seed:', error);
  process.exit(1);
});

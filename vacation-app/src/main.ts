import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global para la API
  app.setGlobalPrefix('api');

  // Validación global de DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // CORS para integración con frontend
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Gestión de Vacaciones')
    .setDescription(
      'Sistema para solicitar y gestionar vacaciones y licencias de empleados',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Autenticación de usuarios')
    .addTag('employees', 'Gestión de empleados')
    .addTag('vacations', 'Solicitudes de vacaciones y licencias')
    .addTag('calendar', 'Calendario y días festivos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`
  ╔═══════════════════════════════════════════════════════╗
  ║     Sistema de Gestión de Vacaciones - Su Tilde       ║
  ╠═══════════════════════════════════════════════════════╣
  ║  Servidor corriendo en: http://localhost:${port}          ║
  ║  Documentación API:     http://localhost:${port}/api/docs ║
  ╚═══════════════════════════════════════════════════════╝
  `);
}

bootstrap();

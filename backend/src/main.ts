import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:9000', 'http://localhost:3000'], // Ivan Germano: Duas origens que julgei necessárias para CORS
    methods: 'GET,POST,PUT,DELETE',                             // Permitir apenas esses métodos HTTP
    credentials: true,                                          // Permitir envio de cookies/sessões
  });
  // Ivan Germano: Aqui estamos habilitando a validação global, isso garante que sempre que um modulo utilizar um dto ele tem que
  // seguir os parametros do dto;
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000);
}
bootstrap();

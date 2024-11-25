import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { Logger } from './utils/Logger';

// Ivan Germano: Essas configurações abaixo sobre "Logger" server para ativar/desativar logs que aparecer no console do backend
// Isso vai permitir criar logs de debug ao mesmo tempo que não deixa o console "poluído" de informações.
Logger.enableCategory('blacklist');
Logger.disableCategory('session');
Logger.disableCategory('login');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: true, // Ivan Germano: Duas origens que julgei necessárias para CORS
    methods: 'GET,POST,PUT,DELETE', // Permitir apenas esses métodos HTTP
    credentials: true, // Permitir envio de cookies/sessões
  });
  // Ivan Germano: Aqui estamos habilitando a validação global, isso garante que sempre que um modulo utilizar um dto ele tem que
  // seguir os parametros do dto;
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(8000);
}
bootstrap();

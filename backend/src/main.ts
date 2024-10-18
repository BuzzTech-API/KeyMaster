import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ivan Germano: Aqui estamos habilitando a validação global, isso garante que sempre que um modulo utilizar um dto ele tem que
  // seguir os parametros do dto;
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8000);
}
bootstrap();

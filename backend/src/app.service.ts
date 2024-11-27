/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UserService } from './user/services/user.service';

@Injectable()
export class AppService implements OnModuleInit {
  // Ivan Germano: DataSource é uma classe que identifica conexões de Banco de Dados
  constructor(
    private dataSource: DataSource, // Ivan Germano: Injeta o serviço de blacklist
    private userService: UserService // Ivan Germano: Injeta o serviço de usuário
  ) {}

  // Ivan Germano: Essa função determina de forma arbitrária que o modulo só continuará com as demais rotinas
  // após realizar essa função primeiro.
  async onModuleInit() {
    console.log('Iniciando o módulo principal...');
    await this.checkDatabaseConnection();
    
    // Ivan Germano: Chamar a sanitização dos dados restaurados assim que o módulo for inicializado
    await this.userService.sanitizeRestoredData();
  }

  // Ivan Germano: Essa função tem responsabilidade de verificar se a conexão com o Banco de Dados Postgres está funcionando.
  async checkDatabaseConnection() {
    try {
      // Ivan Germano: Variável booleana que retorna 'true' caso o banco esteja inicializado, caso contrário retorna false.
      const isConnected = this.dataSource.isInitialized;
      if (isConnected) {
        console.log('Conexão com o Banco de Dados OK!');
        // Ivan Germano: Caso não esteja inicializado por alguma razão, o código faz uma requisição de inicialização para o 
        // banco de dados utilizando o método reservado 'initialize()'
      } else {
        await this.dataSource.initialize();
        console.log('Reconexão com o Banco de Dados OK!');
      }
    // Ivan Germano: Caso a conexão falhe ele retorna uma mensagem intuitiva junto com o log específico do erro.
    } catch (error) {
      console.error('Conexão com Banco de Dados Falhou - motivo:', error.message);
      console.error('Detalhes do Erro:', error);
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}


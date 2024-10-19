/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  // Ivan Germano: DataSource é uma classe que identifica conexões de Banco de Dados
  constructor(private dataSource: DataSource) {}

  // Ivan Germano: Essa função determina de forma arbitrária que o modulo só continuará com as demais rotinas
  // após realizar essa função primeiro.
  async onModuleInit(){
    await this.checkDatabaseConnection();
  }

  // Ivan Germano: Essa função tem responsabilidade de verificar se a conexão com o Banco de Dados Postgress está funcionando.
  async checkDatabaseConnection() {
    try {
        //Ivan Germano: Variável booleana que retorna 'true' caso o banco esteja inicializado, caso contrário retorna false.
        const isConnected = this.dataSource.isInitialized;
        if (isConnected) {
            console.log('Conexão com o Banco de Dados OK!');
        //Ivan Germano: Caso não esteja inicializado por alguma razão, o código faz uma requisição de inicialização para o 
        // banco de dados utilizando o método reservado 'initialize()'
        } else {
            await this.dataSource.initialize();
            console.log('Reconexão com o Banco de Dados OK!');
        }
    //Ivan Germano: Caso a conexão falhe ele retorna uma mensagem intuitiva junto com o log especifico do erro.
    } catch (error) {
        console.error('Conexão com Banco de Dados Falhou - motivo:', error.message);
        console.error('Detalhes do Erro:', error);
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}

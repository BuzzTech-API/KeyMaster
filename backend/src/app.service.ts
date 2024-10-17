/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AppService {
  constructor(private dataSource: DataSource) {}

  async onModuleInit(){
    await this.checkDatabaseConnection();
  }

  async checkDatabaseConnection() {
    try {
        const isConnected = this.dataSource.isInitialized;
        if (isConnected) {
            console.log('Database connection is OK!');
        } else {
            await this.dataSource.initialize(); // Opcional para tentar reconectar, se não estiver conectado
            console.log('Database reconnected successfully!');
        }
    } catch (error) {
        console.error('Database connection failed:', error.message);
        console.error('Error Details:', error);
    }
  }
  getHello(): string {
    return 'Hello World!';
  }
}

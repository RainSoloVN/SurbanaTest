import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as winston from 'winston';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'config/configuration';
import { WinstonModule } from 'nest-winston';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingModule } from './building/building.module';
import { LocationModule } from './location/location.module';
import typeorm from 'config/typeorm';

@Module({
  imports: [
    // Add config for all projects and load config from config/configuration.ts
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, typeorm],
    }),
    // Add winston to project and config format log
    WinstonModule.forRootAsync({
      useFactory: () => ({
        transports: [
          // new winston.transports.Console({}),
          new winston.transports.File({
            filename: "logs-app/Combined-" + new Date(Date.now()).toDateString() + ".log",
            level: "info",
            handleExceptions: true,
          }),
          new winston.transports.File({
            filename: "logs-app/Errors-" + new Date(Date.now()).toDateString() + ".log",
            level: "error",
          }),
        ],
        exceptionHandlers: [
          new winston.transports.File({ 
            filename: "logs-app/Exceptions-" + new Date(Date.now()).toDateString() + ".log",
            level: "exception",
          })
        ],
        format: winston.format.combine(
          winston.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss",
          }),
          winston.format.printf(
            (error) => `${error.timestamp} [${process.platform},${process.pid}] [${error.context}]: ${error.level}: ${error.message}`
          )
        ),
      }),
      inject: [],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => configService.get('postgres_typeorm'),
      inject: [ConfigService],
    }),
    BuildingModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

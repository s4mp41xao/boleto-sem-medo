import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../server/src/app.module';
import express from 'express';
import { INestApplication } from '@nestjs/common';

let cachedApp: INestApplication;

async function bootstrap() {
  if (!cachedApp) {
    const expressApp = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    app.enableCors();
    await app.init();
    cachedApp = app;
  }
  return cachedApp;
}

export default async (req, res) => {
  const app = await bootstrap();
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
};

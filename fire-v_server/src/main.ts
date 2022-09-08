import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as admin from 'firebase-admin';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  admin.initializeApp({
    credential: admin.credential.cert("./key.json")
  });
  const sv = 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.useStaticAssets('uploads/videos/cvt')
  await app.listen(sv);
  console.log(`sever is running on: http://127.0.0.1:${sv}/`)

}
bootstrap();

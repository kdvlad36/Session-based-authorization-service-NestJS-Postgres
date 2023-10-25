import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as device from 'express-device';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(device.capture());
  await app.listen(3000);
}
bootstrap();

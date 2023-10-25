import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as device from 'express-device';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(device.capture());

  const config = new DocumentBuilder()
    .setTitle('Пример API')
    .setDescription('Описание API')
    .setVersion('1.0')
    .addTag('example')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
  console.log('http://localhost:3000/api-docs');
}
bootstrap();

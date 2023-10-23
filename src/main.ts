import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipeCustom } from './shared/pipes/validation.pipe.custom';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('AzziCare')
    .setDescription('Sistema de gestão de home care.')
    .setVersion('1.0')
    .addTag('azzicare')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipeCustom());
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

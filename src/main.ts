import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipeCustom } from './shared/pipes/validation.pipe.custom';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipeCustom());
  await app.listen(3000);
}
bootstrap();

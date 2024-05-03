import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<<< HEAD:backend/product-service/src/main.ts
  await app.listen(6000);
========
  await app.listen(4000);
>>>>>>>> origin/main:backend/profile/src/main.ts
}
bootstrap();

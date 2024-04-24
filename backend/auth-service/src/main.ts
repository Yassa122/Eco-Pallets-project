// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import customCors from "./utils/cors"; // This should be the correct import of your configured CORS
import * as dotenv from "dotenv";

dotenv.config(); // Make sure this is at the top to load environment variables early

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(customCors); // Use custom CORS before any route definition
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
   
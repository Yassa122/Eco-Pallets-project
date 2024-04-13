import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import yoga from "./utils/yoga";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use("/graphql", yoga);

  await app.listen(3000);
}
bootstrap();

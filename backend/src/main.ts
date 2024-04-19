import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
//import yoga from "./utils/yoga";
//import * as dotenv from "dotenv";

//dotenv.config(); // Make sure this is at the top to load environment variables early

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use("/graphql", yoga); // if we will yoga server then it's 100% working
  //we need to make sure that is it okay to use or we need to stick to the typical nestjs structure

  await app.listen(3000);
}
bootstrap();

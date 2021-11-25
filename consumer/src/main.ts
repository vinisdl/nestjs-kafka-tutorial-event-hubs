import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['rdn-lab-us-dig-evhns-01.servicebus.windows.net:9093'],
          sasl: {
            mechanism: 'plain',
            username: "$ConnectionString",
            password: process.env.CONNECTIONSTRING,
          },
          ssl: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();

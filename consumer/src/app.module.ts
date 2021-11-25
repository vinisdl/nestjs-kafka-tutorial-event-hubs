import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';



@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'medium.rocks',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: `medium.rocks`,
            brokers: ['rdn-lab-us-dig-evhns-01.servicebus.windows.net:9093'],
            sasl: {
              mechanism: 'plain',
              username: "$ConnectionString",
              password: process.env.CONNECTIONSTRING,
            },
            ssl: true,
          },
          consumer: {
            groupId: 'medium.rocks',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
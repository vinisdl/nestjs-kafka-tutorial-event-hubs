import { Controller, Get, Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly appService: AppService,
    @Inject('medium.rocks') private readonly client: ClientKafka,
  ) { }

  async onModuleInit() {
    ['medium.rocks'].forEach((key) => this.client.subscribeToResponseOf(`${key}`));
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('kafka-test')
  testKafka() {
    var data = { foo: 'bar', data: new Date().toString() };
    console.log(`send new message ${JSON.stringify(data)}`)
    return this.client.emit('medium.rocks', data)
  }


  @Get('kafka-test-with-response')
  testKafkaWithResponse() {
    var data = { foo: 'bar', data: new Date().toString() };
    console.log(`send new message with response ${JSON.stringify(data)}`)
    return this.client.send('medium.rocks', data)
  }


}

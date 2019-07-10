import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';
import { ConfigService } from '@/config/config.service';
import { Connection } from 'typeorm';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly connection: Connection,
  ) {}

  @Get()
  getHello(): string {
    console.log(this.connection);
    return this.configService.get('ormconfig');
  }
}

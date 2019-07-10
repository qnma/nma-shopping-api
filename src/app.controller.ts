import * as path from 'path';
import * as fs from 'fs';
import { Controller, Get } from '@nestjs/common';
import { Connection } from 'typeorm';
import { AppService } from './app.service';
import { ConfigService } from '@/config/config.service';
import { OssService } from '@/oss/oss.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
    private readonly connection: Connection,
    private readonly oss: OssService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    const filePath = path.resolve('tslint.json');
    const a = await this.oss.upload(
      fs.createReadStream(filePath),
      'tslint.json',
    );
    console.log(a);
    return this.configService.get('ormconfig');
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@/config/config.module';
import { DatabaseModule } from '@/database/database.module';
import { OssModule } from '@/oss/oss.module';

@Module({
  imports: [ConfigModule, DatabaseModule, OssModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

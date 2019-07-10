import { Module } from '@nestjs/common';
import { ConfigModule } from '@/config/config.module';
import { OssService } from './oss.service';

@Module({
  imports: [ConfigModule],
  providers: [OssService],
  exports: [OssService],
})
export class OssModule {}

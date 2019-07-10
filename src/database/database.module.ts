import { Module, DynamicModule, Inject } from '@nestjs/common';
import { ConfigModule } from '@/config/config.module';
import { ConfigService } from '@/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { async } from 'rxjs/internal/scheduler/async';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('ormconfig');
      },
    }),
  ],
})
export class DatabaseModule {}

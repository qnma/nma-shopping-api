import * as path from 'path';
import { Module, Global } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(
        path.resolve(
          'config',
          process.env.NODE_ENV === 'production'
            ? 'production.json'
            : 'development.json',
        ),
      ),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}

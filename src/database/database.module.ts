import { Module, DynamicModule, Inject } from '@nestjs/common';
import { ConfigModule } from '@/config/config.module';
import { ConfigService } from '@/config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ConfigModule],
})
export class DatabaseModule {
  @Inject(ConfigService)
  private static configServer: ConfigService;

  static forRoot(): DynamicModule {
    const provider: DynamicModule = TypeOrmModule.forRoot(
      this.configServer.get('ormconfig'),
    );
    return {
      module: DatabaseModule,
      exports: [provider],
    };
  }
}

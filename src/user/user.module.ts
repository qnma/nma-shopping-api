import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordModule } from '@/password/password.module';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PasswordModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

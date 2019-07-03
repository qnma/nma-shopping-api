import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import User from '@/_entity/user.entity';
import { PasswordModule } from '@/password/password.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PasswordModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

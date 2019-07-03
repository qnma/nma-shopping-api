import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordService } from '@/password/password.service';
import User from '@/_entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async create(
    email: string,
    password: string,
    username?: string,
    avatar?: string,
  ) {
    let currentUsername = username
      ? username
      : '泥马' +
        Math.random()
          .toString(32)
          .slice(2);
    const existUser = await this.userRepository.findOne({
      where: [{ username: currentUsername }, { email }],
    });
    // 已存在用户
    if (existUser) {
      if (existUser.email === email) {
        throw new HttpException('F', HttpStatus.FORBIDDEN);
      } else if (existUser.username === currentUsername) {
        
      }
    }

    const user = this.userRepository.create();
    user.email = email;
    user.passwordHash = this.passwordService.createPasswordHash(password);
    user.username = username;
    user.avatar = avatar;
    await this.userRepository.save([user]);
    return user.id;
  }
}

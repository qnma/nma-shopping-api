import { Injectable } from '@nestjs/common';
import { createPasswordHash, verifyPasswordHash } from '@/_common/passwordHash';

@Injectable()
export class PasswordService {
  createPasswordHash(password: string) {
    return createPasswordHash(password);
  }
  verifyPasswordHash(hash: string, password: string) {
    return verifyPasswordHash(hash, password);
  }
}

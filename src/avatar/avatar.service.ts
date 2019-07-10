import { Injectable } from '@nestjs/common';
import * as jdenticon from 'jdenticon';
import * as Stream from 'stream';

@Injectable()
export class AvatarService {
  private createAvatarPngStream(value: string, size: number): Stream {
    return jdenticon.toPng(value, size);
  }
  createAvatarUrl(): string {
    // @TODO
    return jdenticon.toPng();
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly _config: { [key: string]: any };

  constructor(filePath: string) {
    this._config = require(filePath);
  }

  get(key: string): any {
    return this._config[key];
  }
}

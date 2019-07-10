import * as Stream from 'stream';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as qiniu from 'qiniu';
import { ConfigService } from '@/config/config.service';
import { encodeBase64 } from '@/_common/base64';
import computeSha1 from '@/_common/computeSha1';

@Injectable()
export class OssService {
  private readonly _ak: string;
  private readonly _sk: string;
  private readonly _bucket: string;

  constructor(configService: ConfigService) {
    const qiniuConfig = configService.get('qiniu');
    this._ak = qiniuConfig['ak'];
    this._sk = qiniuConfig['sk'];
    this._bucket = qiniuConfig['bucket'];
  }

  private _createUploadToken(filename: string, expires: number): string {
    const returnBody = `{
      "name": $(filename),
      "size": $(fsize),
      "hash": $(etag)
    }`;
    const putPolicy = JSON.stringify({
      scope: `this._bucket:${filename}`,
      deadline: Date.now() / 1000 + expires,
      returnBody,
    });
    const encodedPutPolicy = encodeBase64(putPolicy);
    const sign = crypto
      .createHmac('sha1', this._sk)
      .update(encodedPutPolicy)
      .digest('hex');
    const encodeSign = encodeBase64(sign);

    return this._ak + ':' + encodeSign + ':' + encodedPutPolicy;
  }

  public async upload(
    fileStream: Stream.Readable,
    filename: string,
  ): Promise<string> {
    const ext = filename ? filename.split('.').slice(-1)[0] : '';
    const fileSha1 = await computeSha1(fileStream);

    const putPolicy = new qiniu.rs.PutPolicy({
      scope: `${this._bucket}:${fileSha1}.${ext}`,
    });
    var mac = new qiniu.auth.digest.Mac(this._ak, this._sk);
    const uploadToken = putPolicy.uploadToken(mac);

    // const uploadToken = this._createUploadToken(fileSha1 + '.' + ext, 7200);
    const config = new qiniu.conf.Config({
      zone: qiniu.zone.Zone_z2,
    });
    const formUploader = new qiniu.form_up.FormUploader(config);
    const putExtra = new qiniu.form_up.PutExtra();
    return new Promise((resolve, reject) => {
      formUploader.putStream(
        uploadToken,
        `${fileSha1}.${ext}`,
        fileStream,
        putExtra,
        (respErr: Error, respBody: any, respInfo: any) => {
          if (respErr) reject(respErr);
          else {
            resolve(JSON.stringify(respBody) + JSON.stringify(respInfo));
          }
        },
      );
    });
  }
}
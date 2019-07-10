import * as crypto from 'crypto';
import * as Stream from 'stream';

export default function(fileStream: Stream): Promise<string> {
  return new Promise((resolve, reject) => {
    const sha1 = crypto.createHash('sha1');
    fileStream.on('data', data => {
      sha1.update(data);
    });
    fileStream.on('end', () => {
      resolve(sha1.digest('hex'));
    });
  });
}

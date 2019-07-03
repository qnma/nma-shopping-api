import * as crypto from 'crypto';

function createHashWithSale(password: string, sale: string): string {
  const sha1 = crypto.createHash('sha1');
  const hash = sha1.update(password).digest('base64');
  return `${sale}/${hash}`;
}

export function createPasswordHash(password: string): string {
  const sale = Math.random()
    .toString(32)
    .slice(2);
  return createHashWithSale(password, sale);
}

export function verifyPasswordHash(
  passwordHash: string,
  password: string,
): boolean {
  const [sale, hash] = passwordHash.split('/');
  return createHashWithSale(password, sale) === hash;
}

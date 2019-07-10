const base64hash =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export function encodeBase64(input: string): string {
  let bin = Reflect.apply([].reduce, input, [
    (pre: string, cur: string) => {
      const curBin = cur.codePointAt(0).toString(2);
      return pre + '00000000'.substr(0, 8 - curBin.length) + curBin;
    },
    '',
  ]);

  // 末位补 0
  bin = Array.apply(null, { length: 6 - (bin.length % 6) }).reduce(
    (pre: string, _: any) => pre + '0',
    bin,
  );

  const hashArr = Array.apply(null, { length: bin.length / 6 })
    .map((_: any, ind: number) => bin.substr(ind * 6, 6)) // 每 6 个为一组
    .map((str: string) => parseInt(str, 2)) // 转为 int
    .map((code: number) => base64hash[code]); // 转为字符
  return [
    ...hashArr,
    '==='.substr(0, !(hashArr.length % 3) ? 3 - (hashArr.length % 3) : 0),
  ].join('');
}

export function decodeBase64(input: string): string {
  const bin = Reflect.apply([].map, input.replace(/[=]+$/g, ''), [
    (char: string) => char,
  ])
    .map((char: string) => base64hash.indexOf(char)) // 取 ascii 码
    .map((ind: number) => ind.toString(2)) // 二进制串
    .map((hash: string) => '000000'.substr(0, 6 - hash.length) + hash) // 补齐 6 位
    .join('');

  return Array.apply(null, { length: Math.floor(bin.length / 8) }) // 每 8 位，转成整数
    .map((_: any, ind: number) => ind)
    .map((ind: number) => bin.substr(ind * 8, 8))
    .reduce(
      (pre: string, cur: string) =>
        pre + String.fromCodePoint(parseInt(cur, 2)),
      '',
    );
}

const a = `{"scope":"my-bucket:sunflower.jpg","deadline":1451491200,"returnBody":"{\"name\":$(fname),\"size\":$(fsize),\"w\":$(imageInfo.width),\"h\":$(imageInfo.height),\"hash\":$(etag)}"}`;

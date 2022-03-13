import crypto from 'crypto';

export default function parseSecret(hubSignatureKV, secret, data) {
  // 获取github签名
  const hubSignature = hubSignatureKV.slice(5);

  // 创建一个hmac对象(必须是sha1算法，secret作为加密秘钥)
  const hmac = crypto.createHmac('sha1', secret);

  // 往hmac对象中添加摘要内容(必须是请求主体，因为Content type配置为application/json，所有此处需要转为json字符串)
  const up = hmac.update(JSON.stringify(data));

  // 使用 digest 方法生成加密内容(必须是hex格式)
  const signature = up.digest('hex');

  // 相同则验证成功
  return hubSignature === signature;
}

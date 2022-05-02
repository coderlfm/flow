import nodemailer from 'nodemailer';

// 发件箱配置
const fromMailOptions = () => ({
  host: process.env.MAIL_HOST,
  service: process.env.MAIL_SERVICE,
  port: process.env.MAIL_PORT, // SMTP 端口
  secureConnection: process.env.MAIL_SECURE_CONNECTION, // 使用了 SSL
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS, // 这里密码不是邮箱密码，是你设置的smtp授权码
  },
});

// 生成收件箱配置
const toMailOptions = (subject, context) => {
  return {
    from: process.env.MAIL_HOST_FROM, // sender address 地址必须和邮箱地址一致
    to: process.env.MAIL_HOST_TO, // list of receivers
    subject: subject, // Subject line
    html: context, // 发送text或者html格式
  };
};

// 邮件发送
export async function sendMail(subject = '', context = '') {
  // 生成邮件服务
  const transporter = await nodemailer.createTransport(fromMailOptions());

  // 发送邮件
  transporter.sendMail(toMailOptions(subject, context), (error, info) => {
    if (error) return console.log(error);
    console.log('部署成功: %s', info.messageId);
  });
}

export default sendMail;

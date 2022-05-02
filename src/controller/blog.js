import child_process from 'child_process';
import { promisify } from 'util';

import { pull } from '../utils/pull.js';
import { exec } from '../utils/exec.js';
import parseSecret from '../utils/parse-secret.js';
import sendMail from '../utils/send-mail.js';

const childProcessExec = promisify(child_process.exec);

const secret = 'github_blog_push_action';

// 处理自动化构建blog
export default async function (req, res) {
  if (!parseSecret(req.headers['x-hub-signature'], secret, req.body)) {
    res.status(400).json({ msg: 'secret 校验失败' });
    return;
  }

  // 验证成功，执行构建流程
  setTimeout(publish, 0);

  res.json({ msg: '构建中...', code: 0 });
}

// 发布
async function publish() {
  console.log('git pull ......');

  // git pull 拉取最新 blog  result = 0:成功 1:失败
  const result = await pull(process.env.BLOG_DIR);
  console.log('git pull: ', result ? '失败' : '成功');

  // git pull 失败，不断重试
  if (result) return await publish();

  // git pull 成功，打包blog
  const res = await exec('pnpm run publish', { cwd: process.env.BLOG_DIR, stdio: 'inherit' });

  console.log('publish 结果:', res);

  // blog 部署成功，发送邮件通知
  sendBlogSuccessMail();
}

async function sendBlogSuccessMail() {
  // 获取最近一条 msg
  const { stdout } = await childProcessExec(`git log --pretty='%s%b'`, { cwd: process.env.BLOG_DIR });
  const stdoutArray = stdout.split('\n');
  const currentMsg = `部署成功：${stdoutArray[0]}`;

  // 获取最近一次 commit 完整的信息
  const { stdout: detailStdout } = await childProcessExec(`git show --stat`, { cwd: process.env.BLOG_DIR });

  const body = `
  <h3> 部署成功，可前往 https://blog.liufengmao.cn  进行查看 </h3>
  ${detailStdout
    .split('\n')
    .map((item) => `<p>${item}</p>`)
    .join('')}
  `;

  sendMail(currentMsg, body);
}

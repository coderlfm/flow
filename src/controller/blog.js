import { pull } from '../utils/pull.js';
import { exec } from '../utils/exec.js';
import parseSecret from '../utils/parse-secret.js';

const secret = 'github_blog_push_action';

// 处理自动化构建blog
export default async function (req, res) {
  if (!parseSecret(req.headers['x-hub-signature'], secret, req.body)) {
    res.status(400).json({ msg: 'secret 校验失败' });
  }

  console.log('开始构建');

  setTimeout(publish, 0);
  res.json({ msg: '构建成功~', code: 0 });
}

async function publish() {
  // 0:成功 1:失败
  const result = await pull(process.env.BLOG_DIR);
  console.log('git pull: ', result ? '失败' : '成功');
  if (result) await publish();

  const res = await exec('pnpm run publish', { cwd: process.env.BLOG_DIR, stdio: 'inherit' });
  console.log('publish 结果:', res);
}

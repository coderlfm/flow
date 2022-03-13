import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import { pathExistsSync } from 'path-exists';
import { exec } from '../utils/exec.js';

let __dirname = path.dirname(new URL(import.meta.url).pathname);
__dirname = process.platform === 'win32' ? __dirname.slice(1) : __dirname;

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 自动构建 blog
app.post('/', async function (req, res) {
  async function preParse() {
    const dotenvPath = path.resolve(__dirname, '../.env');
    if (pathExistsSync(dotenvPath)) {
      dotenv.config({ path: dotenvPath });
      return true;
    } else {
      console.log('env 配置文件未填写，请在 .env 文件中配置 blog 项目的目录地址');
      return false;
    }
  }

  if (!(await preParse())) {
    res.json({ msg: '构建失败，未配置环境变量' });
    return;
  }

  await exec('git pull', { cwd: process.env.BLOG_DIR });
  await exec('pnpm run publish', { cwd: process.env.BLOG_DIR });

  res.json({ msg: '构建成功~' });
});

export default app;

import path from 'path';
import express from 'express';
import blogContrller from '../controller/blog.js';

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// 自动构建 blog
app.post('/', async function (req, res) {
  if (!process.env.BLOG_DIR) {
    res.status(500).json({ msg: '构建失败，未配置 blog 目录', code: 500 });
    return;
  }

  blogContrller(req, res);
});

export default app;

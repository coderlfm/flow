import createHandler from 'github-webhook-handler';
import { pull } from '../utils/pull.js';

const blogHandler = createHandler({ path: '/webhook', secret: 'github bog push action' });

// 处理自动化构建blog
export default function (req, res) {
  blogHandler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  });

  blogHandler.on('push', async function (event) {
    await publish();

    res.json({ msg: '构建成功~', code: 0 });

    console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref);
  });
}

async function publish() {
  try {
    // 0:成功 1:失败
    const result = await pull(process.env.BLOG_DIR);
    if (result) await publish();
  } catch (error) {
    console.log('拉取代码错误', error);
  }
  await exec('pnpm run publish', { cwd: process.env.BLOG_DIR });
}

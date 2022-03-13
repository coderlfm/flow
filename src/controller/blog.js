import createHandler from 'github-webhook-handler';

const blogHandler = createHandler({ path: '/webhook', secret: 'github bog push action' });

// 处理自动化构建blog
export default function (req, res) {
  blogHandler(req, res, function (err) {
    res.statusCode = 404;
    res.end('no such location');
  });

  blogHandler.on('push', async function (event) {
    await exec('git pull', { cwd: process.env.BLOG_DIR });
    await exec('pnpm run publish', { cwd: process.env.BLOG_DIR });
    
    res.json({ msg: '构建成功~', code: 0 });

    console.log('Received a push event for %s to %s', event.payload.repository.name, event.payload.ref);
  });
}

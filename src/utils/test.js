import child_process from 'child_process';
import { promisify } from 'util';
import { exec } from './exec.js';

import fs from 'fs';
import preParse from '../utils/pre-parse.js';
import sendMail from './send-mail.js';

const childProcessExec = promisify(child_process.exec);
preParse();

async function test() {

  const { stdout } = await childProcessExec(`git log --pretty='%s%b'`, { cwd: process.env.BLOG_DIR });
  const stdoutArray = stdout.split('\n');
  const currentMsg = `部署成功：${stdoutArray[0]}`;

  const { stdout: detailStdout } = await childProcessExec(`git show --stat`, { cwd: process.env.BLOG_DIR });
  console.log(detailStdout);

  const body = `
  <h3> 部署成功，可前往 https://blog.liufengmao.cn  进行查看 </h3>
  ${detailStdout
    .split('\n')
    .map((item) => `<p>${item}</p>`)
    .join('')}
  `;

  sendMail(currentMsg, body);
}

test();

// let commitMessage = '';

// child_process.exec(`git log --pretty='%s%b%B'`, function (err, stdout) {
//   const stdoutArray = stdout.split('\n');
//   commitMessage += stdoutArray[1];
//   console.log(stdoutArray[0]);
// });

// exec('git show --stat').then((res) => {
//   console.log('res:', res);

// });

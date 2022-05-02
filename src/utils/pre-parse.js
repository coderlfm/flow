
import dotenv from 'dotenv';
import path from 'path';
import { pathExistsSync } from 'path-exists';


let __dirname = path.dirname(new URL(import.meta.url).pathname);
__dirname = process.platform === 'win32' ? __dirname.slice(1) : __dirname;


export default function preParse() {
  const dotenvPath = path.resolve(__dirname, '../../.env');
  if (pathExistsSync(dotenvPath)) {
    dotenv.config({ path: dotenvPath });
    return true;
  } else {
    throw new Error('env 配置文件未填写，请在 .env 文件中配置 blog 项目的目录地址');
  }
}
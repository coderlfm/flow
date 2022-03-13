import path from 'path';
import { exec } from '../utils/exec.js';

let __dirname = path.dirname(new URL(import.meta.url).pathname);
__dirname = process.platform === 'win32' ? __dirname.slice(1) : __dirname;

exec('ls', { cwd: path.resolve(__dirname, '../app'), stdio: 'inherit' });

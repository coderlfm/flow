import { exec } from './exec.js'

async function pull(dir) {
  return await exec('git pull', { cwd: dir });
}

export { pull }
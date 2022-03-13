import crypto from 'crypto';
import path from 'path';
import { exec } from '../utils/exec.js';

let algorithm = 'sha1',
  secret = 'github_blog_push_action';
const hmac = crypto.createHmac(algorithm, secret);

hmac.update(Buffer('ca85e020-a2be-11ec-8a25-f0713ffbcb0'), 'utf-8');
algorithm + '=' + hmac.digest('hex');
console.log('algorithm:', algorithm);

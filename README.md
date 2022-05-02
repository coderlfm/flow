## 自动化构建服务

## 环境变量
```
BLOG_DIR=
PORT=

// 邮箱配置
MAIL_HOST=smtp.163.com
MAIL_SERVICE=163
MAIL_PORT=465
MAIL_SECURE_CONNECTION=true
MAIL_USER=xxx@163.com
MAIL_PASS=授权码

// 收件箱配置
MAIL_HOST_FROM="Blog 自动化构建服务" <xxx@163.com>
MAIL_HOST_TO=yyy@qq.com
```

### blog 自动化构建
为了便于多环境本地部署及打包上传到七牛云的问题，逐使用该自动化blog部署
每次blog仓库接收到新的push，该服务都会重新构建一下blog，然后将静态资源上传至七牛云

#### 邮件通知
为了便于了解构建情况，构建成功后会发送成功邮件
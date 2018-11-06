[TOC]

# blog-server

> 个人博客后端，前后端分离开发（[前端地址](https://github.com/TJCollinZhang/blog-front-end)），整体采用Koa2+mongo，koa-static静态映射支持所用图片上传后本地存储。

技术栈如下：

- 路由采用装器包装，能自动部分请求鉴别参数
- koa-multer处理文件上传，koa-static映射上传文件
- jwt登录鉴权
- nginx+https+pm2部署
- ... ...

相关功能以及技术讲解请参照我的个人博客文章：

- https://blog.csdn.net/tjzc1352640
- https://blog.collinjs.site/



> [Online Demo](https://blog.collinjs.site/)



## 启动

```sh
node start.js
```



## 后续待完成功能

- webpack打包配置（目前打包成功，但是打包后的文件运行异常，正在加急解决）

- log4js统一管理日志
- 评论以及点赞功能上线
- 浏览量统计功能
- ... ...

## Thanks

后端大量参考了naice大神的[博客后端](https://github.com/naihe138/naice-blog-koa)，特此感谢！


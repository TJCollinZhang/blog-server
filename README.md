# blog-server

![GitHub release](https://img.shields.io/github/release/TJCollinZhang/blog-server.svg)

[![GitHub license](https://img.shields.io/github/license/TJCollinZhang/blog-server.svg)](https://github.com/TJCollinZhang/blog-server/blob/master/LICENSE)



> 个人博客后端，前后端分离开发（[前端地址](https://github.com/TJCollinZhang/blog-front-end)），整体采用Koa2+mongo，koa-static静态映射支持所用图片上传后本地存储。



> [Online Demo](https://blog.collinjs.site/)



技术栈如下：

- 路由采用装器包装，能自动部分请求鉴别参数
- koa-multer处理文件上传，koa-static映射上传文件
- jwt登录鉴权
- nginx+https+pm2部署
- ... ...

相关功能以及技术讲解请参照我的个人博客文章：

- https://blog.csdn.net/tjzc1352640
- https://blog.collinjs.site/



## 启动

```sh
node start.js
```



## 前后端RESTful API

### 接口版本

| 版本号 | 制定人 | 制定日期   | 备注         |
| ------ | ------ | ---------- | ------------ |
| 1.0.0  | Collin | 2018/10/20 | 基本功能实现 |

### 接口描述

> BaseURL： https://blog.api.collinjs.site/api/

1. 文章相关接口

   > 统一前缀：article/

   - 获取文章列表

     请求URL：article_list

     请求方式：GET

     参数说明：

     | 参数名 | 是否必须 | 参数类型 | 说明     |
     | ------ | -------- | -------- | -------- |
     | page   | 否       | int      | 分页页数 |

   - 获取文章内容

     请求URL：article/

     请求方式：GET

     参数说明：

     | 参数名    | 是否必须 | 参数类型 | 说明   |
     | --------- | -------- | -------- | ------ |
     | articleId | 是       | string   | 文章id |

   - 删除文章

     请求URL：article/

     请求方式：DELETE

     | 参数名    | 是否必须 | 参数类型 | 说明   |
     | --------- | -------- | -------- | ------ |
     | articleId | 是       | string   | 文章id |

   - 修改文章

     请求URL：article/

     请求方式：PUT

     | 参数名   | 是否必须 | 参数类型 | 说明     |
     | -------- | -------- | -------- | -------- |
     | _id      | 是       | string   | 文章id   |
     | title    | 是       | string   | 文章标题 |
     | abstract | 是       | string   | 文章摘要 |
     | tags     | 是       | string   | 文章标签 |
     | content  | 是       | string   | 文章内容 |

   - 保存文章

     请求URL：article/

     请求方式：POST

     | 参数名   | 是否必须 | 参数类型 | 说明     |
     | -------- | -------- | -------- | -------- |
     | title    | 是       | string   | 文章标题 |
     | abstract | 是       | string   | 文章摘要 |
     | tags     | 是       | string   | 文章标签 |
     | content  | 是       | string   | 文章内容 |

2. 项目相关接口

   > 统一前缀：project/

   - 获取项目列表

     请求URL：project_list/

     请求方式：GET

     | 参数名 | 是否必须 | 参数类型 | 说明     |
     | ------ | -------- | -------- | -------- |
     | page   | 否       | int      | 分页页数 |

   - 删除项目

     请求URL：project/

     请求方式：DELETE

     | 参数名    | 是否必须 | 参数类型 | 说明   |
     | --------- | -------- | -------- | ------ |
     | projectId | 是       | string   | 项目id |

   - 保存项目信息

     请求URL：project/

     请求方式：POST

     | 参数名      | 是否必须 | 参数类型 | 说明         |
     | ----------- | -------- | -------- | ------------ |
     | projectName | 是       | string   | 项目名称     |
     | projectCode | 是       | string   | 项目源码     |
     | projectDesc | 否       | string   | 项目描述     |
     | projectUrl  | 否       | string   | 项目线上地址 |
     | projectIcon | 否       | string   | 项目图标     |

3. 标签相关接口

   > 统一前缀：tag/

   - 获取标签列表

     请求URL：tag/

     请求方式：GET

     | 参数名 | 是否必须 | 参数类型 | 说明     |
     | ------ | -------- | -------- | -------- |
     | page   | 否       | int      | 分页页数 |

   - 保存标签

     请求URL：tag/

     请求方式：POST

     | 参数名      | 是否必须 | 参数类型 | 说明     |
     | ----------- | -------- | -------- | -------- |
     | tagName     | 是       | string   | 标签名称 |
     | description | 是       | string   | 标签描述 |

   - 删除标签

     请求URL：project/

     请求方式：POST

     | 参数名    | 是否必须 | 参数类型 | 说明   |
     | --------- | -------- | -------- | ------ |
     | projectId | 是       | string   | 标签id |

4. 身份信息相关接口

   > 统一前缀：user/

   - 登录

     请求URL：login/

     请求方式：POST

     | 参数名   | 是否必须 | 参数类型 | 说明     |
     | -------- | -------- | -------- | -------- |
     | username | 是       | string   | 登录账户 |
     | password | 是       | string   | 登录密码 |



## 后续待完成功能

- webpack打包配置（目前打包成功，但是打包后的文件运行异常，正在加急解决）

- log4js统一管理日志
- 评论以及点赞功能上线
- 浏览量统计功能
- ... ...

## Thanks

后端大量参考了naice大神的[博客后端](https://github.com/naihe138/naice-blog-koa)，特此感谢！




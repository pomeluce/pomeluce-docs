# Nginx 安装配置

## Nginx安装

```shell
# Arch Linux
pacman/yay -S nginx
```

## Nginx配置

### 二级域名配置

1. 配置文件添加二级域名 server 配置

```nginx
http {
    server {
        listen       80;
        server_name  xxx.com; # 主域名

        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }
    }

    server {
        listen       80;
        server_name  doc.xxx.com; # 二级域名

        location / {
            root   /xxx/xxx/xxx;
            index  index.html index.htm;
            try_files $uri $uri/ /index.html; # 解决刷新 404
        }
    }

    # 可配多个二级域名 server
    ...
}
```

2. 域名 DNS 服务器使用 A 记录执行服务器 ip

```
|  Type  |   Host   |   Value   |    TTL    |
---------------------------------------------
|A Record|    doc   |xx.xx.xx.xx|   1 min   |
```

3. 先停止 nginx 服务, 在启动, restart 可能会不生效

```shell
systemctl stop nginx.service
systemctl sart nginx.service
```

### Https配置

1. 先获取 ssl 证书, 拿到 pem 证书和 key 私钥
2. 开启 443 端口, 配置证书

```nginx
server {
    # listen       80;
    listen       443 ssl;
    server_name  www.xxx.com;

    ssl_certificate      /pem/path/ssl_server.pem; # 证书
    ssl_certificate_key  /key/path/ssl_private.key; # 私钥

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;    #加密算法
    ssl_prefer_server_ciphers  on;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3; #安全链接可选的加密协议

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
```

3. 重启 nginx 服务

### 301重定向

- 设置 xxx.com 根域名跳转 www.xxx.com, 方便网站 seo

```nginx
server {
    # listen       80;
    listen       443 ssl;
    server_name  xxx.com www.xxx.com; # 匹配根域名和 www 域名

    # 不是 www 域名, 则将根域名跳转到 www 域名
    if ($host != 'www.xxx.com') {
      rewrite ^/(.*)$ https://www.pomeluce.org/$1 permanent;
    }

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
```

### 日志输出

1. 指定日志格式, 如下定义了一个 main 的日志输出格式
   - **name:** 格式名称, 在 access_log 指令中引用
   - **escape:** 设置变量中的字符编码方式是 `son` 还是 `efault`, 默认是 `efault`
   - **string:** 要定义的日志格式内容, 该参数可以有多个, 参数中可以使用 Nginx 变量

```nginx
# 语法 log_format name [escape=default|json] string ...;
http {
    log_format  main  '$remote_addr - $remote_user [$time_iso8601] "$request" '
        			 '$status $body_bytes_sent "$http_referer" '
        			 '"$http_user_agent" "$http_x_forwarded_for"';
}
```

:::info string 参数:

| 变量                  | 含义                                                                                                                     |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| $bytes_sent           | 发送给客户端的总字节数                                                                                                   |
| $body_bytes_sent      | 发送给客户端的字节数, 不包括响应头的大小                                                                                 |
| $connection           | 连接序列号                                                                                                               |
| $connection_requests  | 当前通过连接发出的请求数量                                                                                               |
| $msec                 | 日志写入时间, 单位为秒，精度是毫秒                                                                                       |
| $pipe                 | 如果请求是通过 http 流水线发送，则其值为"p", 否则为"."                                                                   |
| $request_length       | 请求长度(包括请求行, 请求头和请求体)                                                                                     |
| $request_time         | 请求处理时长, 单位为秒, 精度为毫秒, 从读入客户端的第一个字节开始, 直到把最后一个字符发送张客户端进行日志写入为止         |
| $status               | 响应状态码                                                                                                               |
| $time_iso8601         | 标准格式的本地时间, 形如 "2017-05-24T18:31:27+08:00"                                                                     |
| $time_local           | 通用日志格式下的本地时间, 如 "24/May/2017:18:31:27 +0800"                                                                |
| $http_referer         | 请求的 referer 地址                                                                                                      |
| $http_user_agent      | 客户端浏览器信息                                                                                                         |
| $remote_addr          | 客户端 IP                                                                                                                |
| $http_x_forwarded_for | 当前端有代理服务器时, 设置 web 节点记录客户端地址的配置, 此参数生效的前提是代理服务器也要进行相关的 x_forwarded_for 设置 |
| $request              | 完整的原始请求行, 如 "GET / HTTP/1.1"                                                                                    |
| $remote_user          | 客户端用户名称, 针对启用了用户认证的请求                                                                                 |
| $request_uri          | 完整的请求地址, 如: "https://daojia.com/"                                                                                |

:::

2. 指定日志位置, 注意: `access_log` 指令的作用域分别有: `http`, `server`, `location`, `limit_except`
   - **path:** 指定日志的存放位置
   - **format:** 指定日志的格式, 默认使用预定义的 `combined`
   - **buffer:** 用来指定日志写入时的缓存大小, 默认是 64k
   - **gzip:** 日志写入前先进行压缩, 压缩率可以指定, 从 1~9 数值越大压缩比越高, 同时压缩的速度也越慢, 默认是 1
   - **flush:** 设置缓存的有效时间, 如果超过 flush 指定的时间, 缓存中的内容将被清空
   - **if:** 条件判断, 如果指定的条件计算为 0 或空字符串, 那么该请求不会写入日志

```nginx
# access_log path [format [buffer=size] [gzip[=level]] [flush=time] [if=condition]]; # 设置访问日志
# access_log off; # 关闭访问日志
access_log 	/var/log/nginx/nginx-access.log
```

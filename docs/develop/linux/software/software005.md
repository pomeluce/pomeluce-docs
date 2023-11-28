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

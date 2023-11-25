# Redis 安装配置

## 软件安装

```shell
# arch linux 安装
pacman -S redis
```

## 软件配置

1. 默认配置文件在 /etc/redis/redis.conf, 修改之前先备份

```shell
cp /etc/redis/redis.conf /etc/redis/redis.conf.bak
```

2. 设置端口号(默认为 6379)

```
port 6379
```

3. 设置密码(可选配置)

```shell
requirepass 密码
```

4. 设置允许远程连接

```shell
# 注释掉下面行, 开放所有 ip 远程连接
bind 127.0.0.1 -::
# 指定 ip 远程连接, 则修改为指定 ip, 如下, 可指定多个 ip
bind 192.168.1.12 192.168.1.23
```

5. 允许后台运行

```shell
daemonize yes
```

6. 保护模式(建议打开, 设置密码)

```shell
# 关闭 protected-mode 模式, 此时外部网络可以直接访问
# 开启 protected-mode 保护模式, 需配置 bind ip 或者设置访问密码
protected-mode yes
```

## 启动服务

设置开启自启动, 并启动服务

```shell
systemctl enable ---now redis.service
```

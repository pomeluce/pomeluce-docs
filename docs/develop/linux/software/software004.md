# RabbitMQ

## 软件安装

1. 安装

```shell
# Arch Linux
yay -S rabbitmq
```

2. 启动服务

```shell
systemctl enable --now rabbitmq.service
```

## 软件配置

1. 启用 web 面板

```shell
rabbitmq-plugins enable rabbitmq_management
```

2. 默认用户 guest 只能本地访问, 如需远程访问 web 面板需要新建用户

```shell
# rabbitmqctl add_user username password
rabbitmqctl add_user root 123456
```

3. 添加权限

```shell
rabbitmqctl set_permissions -p / root ".*" ".*" ".*"
```

4. 设置为管理员

```shell
rabbitmqctl set_user_tags root administrator
```

5. 查看所有用户

```shell
rabbitmqctl list_users
```

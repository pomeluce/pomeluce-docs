# Rsnapshot 备份

## 1.软件安装

```bash
# archlinux
pacman -S rsnapshot

# centos
yum install epel-release -y # 如果之前没安装过第三方库 EPEL
yum install rsnapshot -y
```

## 2.ssh免密配置

具体内容见: [ssh 免密配置](../syserver/syserver001.md)

## 3.软件配置

1. 配置文件默认在 /etc/rsnapshot.conf, 在修改之前建议先进行备份, 以便于恢复

```bash
# 备份默认配置文件
cp -rp /etc/rsnapshot.conf /etc/rsnapshot.conf.bak
```

2. 指定备份记得备份目录

```bash
snapshot_root   /data/backup/
```

3. 取消注释 cmd_ssh 允许远程备份通过 ssh 进行备份

```bash
cmd_ssh         /usr/bin/ssh
```

4. 指定备份级别

```bash
#########################################
# BACKUP LEVELS / INTERVALS #
# Must be unique and in ascending order #
# e.g. alpha, beta, gamma, etc. #
#########################################

retain hourly  24
retain daily   7
retain weekly  4
retain monthly 3
```

> 在这里, retain daily 7 意味着每次运行 rsnapshot daily 时, 都会创建一个新快照, 轮换旧快照, 并在 Rsnapshot 根目录中名为 daily.0,, daily.1, ...的目录中保留最近的 7 个备份, 然后下次运行该命令时,该 daily.6 目录将被删除

6. 如果修改了 ssh 的默认端口, 则需要指定修改后的 ssh 端口

```bash
# ssh_args -p 端口号
ssh_args -p 2222
```

7. 如果要开启日志, 则取消注释 logfile 行

```bash
logfile /var/log/rsnapshot
```

8. 指定备份目录

```bash
###############################
### BACKUP POINTS / SCRIPTS ###
###############################

# backup 要备份的目录           备份文件存储目录
backup /home/example/data/     local/  #备份本地目录
backup root@ip:/example/data/   remote/ #备份远程目录
```

> Ps: 由于上面已经配置过 rsnapshot_root 目录, 所以这里不用写全路径 /data/backup/local/ 和 /data/backup/remote/

配置完后, 保存并关闭 /etc/rsnapshot.conf 文件, 同时输入 rsnapshot configtest 命令验证配置是否成功, 如果成功, 会输出: `Syntax OK`

## 4.数据备份

1. 手动备份, 执行一下命令, 开启备份

```bash
# rsnapshot 备份级别, 这里的备份级别为上面配置文件自己定义的备份级别
rsnapshot daily
```

2. 计划备份, 定义 cron 作业来定期执行执行备份作业

```bash
# 在 /etc/cron.d/ 目录中, 新建一个 rsnapshot 文件, 指定对应级别
0 */1 * * *  /usr/bin/rsnapshot hourly  # 每小时进行一次备份, 使用 hourly 级别
0 20 * * *   /usr/bin/rsnapshot daily   # 每天晚上 8 点进行一次备份, 使用 daily 级别
0 21 * * 0   /usr/bin/rsnapshot weekly  # 每天周天 21 点进行一次备份, 使用 weekly 级别
0 22 15 * *  /usr/bin/rsnapshot monthly # 每月 15 号 22 点进行一次备份, 使用 monthly 级别
```

## 5.多策略备份

上面的备份中, 使用不同的备份级别备份的目录都是一样的, 如果想使用不同级别备份不同的目录数据, 可以配置多份配置文件, 在执行命令时指定对应的配置文件, 来实现不同策略备份不同数据

```bash
rsnapshot -c /path/rsnapshot1.conf daily
rsnapshot -c /path/rsnapshot2.conf weekly
```


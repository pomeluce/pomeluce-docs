# PostgreSQL 安装

## 1. 安装 PostgreSQL

### 1. Linux 安装

* Arch Linux

```zsh
yay/pacman -S postgresql
```

* Centos Linux

```zsh
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get -y install postgresql
```

### 2. Windows 安装

在[下载页面](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)选择要安装的版本对应的 Windows 安装包, 一键安装

## 2. 初始化数据库

### 1. 设置用户密码

* Linux 系统在安装完成之后, 会默认创建一个系统用户 postgres, 密码为空, 需要设置一个密码

```zsh
sudo passwd postgres
```

### 2. 初始化数据库

* 使用 postgres 用户执行 initdb 命令初始化, 指定数据库的区域、字符进编码、以及数据目录

```zsh
sudo su - postgres -c "initdb --locale en_US.UTF-8 -E UTF8 -D '/var/lib/postgres/data'"
```

### 3. 启动数据库

```zsh
systemctl enable --now postgresql.service
```

## 3. 启用密码登录

PostgreSQL 安装完成之后, 默认登录是不验证密码的, 我们需要开启密码验证功能

### 1. 修改用户密码

* 首先, 进入到命令行交互界面

```zsh
psql -U postgres -d postgres
```

* 执行 alter 语句修改用户密码

```sql
alter user postgres with password '密码'
```

### 2. 开启密码登录

* 使用 vim 编辑 pg_hba.conf 文件

```zsh
sudo vim /var/lib/postgres/data/pg_hba.conf
```

* 设置密码加密方式

```zsh
# TYPE  DATABASE        USER            ADDRESS                 METHOD

# 允许本地数据库连接, 并进行密码验证
local   all             all                                     scram-sha-256
# 允许任何 ip 进行数据库连接, 并进行密码验证
host    all             all             0.0.0.0/0               scram-sha-256
```

:::tip 加密方式:

> 可以是`trust`、`reject`、`md5`、`password`、`scram-sha-256`、`gss`、`sspi`、`ident`、`peer`、`pam`、`ldap`、`radius` 或 `cert` 请注意, `password` 以明文形式发送密码; `md5` 或 `scram-sha-256` 是首选, 因为它们发送加密的密码

:::

* 重启 postgres 服务

```zsh
systemctl restart postgresql.service
```



## 4. 用户配置(可选)

在安装完之后可以创建一个与当前系统用户名同名的数据库用户, 并允许其访问 PostgreSQL 数据库的 shell, 那么在使用PostgreSQL 数据库 shell 的时候无需指定用户登录(这样做会比较方便)

* 例如, 当前系统用户名为: psdb, 那么我们可以使用如下命令创建一个 psdb 的数据库用户

```zsh
# 使用 postgres 用户执行用户创建命令
sudo su - postgres -c "createuser --interactive"

# 或者进入到 postgres 用户, 然后执行命令
su postgres

createuser --interactive
```

* 执行完毕后会有如下输出, 提示你输入要创建的用户用户名, 是否分配为超级管理员

:::tip $ sudo su - postgres -c "createuser --interactive"

​	Enter name of role to add: psdb

​	Shall the new role be a superuser? (y/n) y

:::

* 回到系统 shell, 使用 createdb 命令创建一个同名数据库

```zsh
createdb psdb
```

* 创建完成后, 就可以在当前系统用户下, 直接使用 psql 启动进入当前 PostgreSQL 命令行交互界面

```zsh
psql
```

* 可以使用如下命令进行信息查看
  * `\du`: 命令列出所有用户和权限
  * `\dt`: 命令展示当前数据库所有表相关的汇总字段
  * `\help`: 查看帮助
  * `\q`: 退出命令行

```zsh
➜ psql -U root -d lucasdb
psql (15.3)
输入 "help" 来获取帮助信息.

lucasdb=# \du
                             角色列表
  角色名称 |                    属性                     | 成员属于 
----------+--------------------------------------------+----------
 postgres | 超级用户, 建立角色, 建立 DB, 复制, 绕过RLS      | {}
 root     | 超级用户, 建立角色, 建立 DB                   | {}

lucasdb=# \dt
没有找到任何关系.
lucasdb=# \q

```


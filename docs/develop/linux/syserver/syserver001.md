# SSH 免密登录

## 1.配置 sshd_config

服务端开启免密登录配置, 配置文件位置: `/etc/ssh/sshd_config`, 开启如下配置, 修改完之后之执行 `systemctl restart sshd` 重启服务

```bash
# 是否允许 root 远程登录
PermitRootLogin yes

# 密码登录是否打开
PasswordAuthentication yes

# 开启公钥认证
RSAAuthentication yes # 这个参数可能没有
PubkeyAuthentication yes

# 存放登录用户公钥的文件位置
# 位置就是登录用户名的家目录下的 .ssh
# root 就是 /root/.ssh
# jor 就是 /home/jor/.ssh
AuthorizedKeysFile .ssh/authorized_keys
```

## 2.生成密钥

用户端生成公钥私钥, 并复制到服务器配置文件中, 免密配置成功

```bash
ssh-keygen -t rsa -C "commit"

ssh-copy-id -i (-o HostKeyAlgorithms=+ssh-rsa -o PubkeyAcceptedKeyTypes=+ssh-rsa) ~/.ssh/id_rsa.pub 服务器用户名@服务器地址
```

## 3.配置别名(可选)

可配置别名, 方便登录, **如果使用的协议不是 ssh-rsa 则需配置该文件, 指定 IdentityFile, 否则免密登录不生效**

```bash
# 登录的服务器别名 ssh examp 就可以了
Host examp
    HostName 233.233.233.233 # 要登录的服务器ip
    Port 22
    User root # 登录名
    IdentityFile ~/.ssh/id_rsa # 你的私钥路径
    # 服务器版本低于 8.8p1 时添加
    HostKeyAlgorithms +ssh-rsa
    PubkeyAcceptedKeyTypes +ssh-rsa
```

:::warning ps:

对于版本 >= 8.8p1 的 openssh, ssh 客户端默认禁用了 ssh-rsa 算法, 但是服务器端未升级 openssh 只支持 ssh-rsa, 当无法升级远程服务器的 openssh 版本或修改配置使用更安全的算法时, 可在连接或配置别名的时候指定算法, 保证远程连接成功

:::

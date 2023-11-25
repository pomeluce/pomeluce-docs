# VPS 安装 Arch Linux

**适用条件**

1. 没有远程控制台(VNC/IPMI) 且不能挂载 ISO 的服务器
2. 从头安装, 定制更多内容(如硬盘重新分区后安装)

3. 服务器具有足够的内存, 2G 起步

## Grml安装

Grml 是一个基于 Debian 的可引导实时系统(Live-CD), Grml 内置很多适用于系统管理员的 GNU/Linux 软件, Grml 特别适用于安装、部署和系统救援等管理任务,而 grml-rescueboot 可以帮你轻松完成 GRUB 引导 ISO 的配置, 方便随时引导 Grml Live Linux.

1. 服务器需要先安装 Debian 系统, 在自己的服务器云控制台选择 Debian11 安装
2. 安装 grml-rescueboot

```shell
apt -y update
apt -y install grml-rescueboot
```

3. 下载 grml 的 iso 镜像

```shell
# 可以使用如下命令自动下载最新的 grml iso, 但是这个只能下载 full 版本的 iso
update-grml-rescueboot
# 如果机器内存较小, 我们可以手动下载并使用 small 版本的 iso
cd /boot/grml
wget https://download.grml.org/grml64-small_2022.11.iso
```

:::

tip 注

即便是 small 版本的 iso, 如果启动参数有 toram(将整个系统放在内存运行)机器内存也至少需要 2gb 才能引导;

对于大多数使用情况而言, toram 是一个必须要启用的配置, 如果仅仅只是通过硬盘引导 iso 的话, 可以做的事情非常有限, 比如你要给硬盘重新分区就无法完成

:::

4. 编辑配置文件, 在这个配置文件里面我们需要配置 ssh 密码等一些信息

```shell
vim /etc/default/grml-rescueboot
```

5. 对于原系统是 debian 的, 并且使用 ifupdown 来管理网络的机器, 可以在启动选项里面使用 debnet, 这样 grml 就会自动将原系统内的 interfaces 配置文件复制到 grml 内使用

```shell
CUSTOM_BOOTOPTIONS="ssh=password lang=us keyboard=us tz=Asia/Shanghai debnet toram"
```

6. 如果原系统的网关 ip 不在同一网段, grml 将无法添加默认路由, 在启动选项里面加入 services=networking 即可解决

```shell
CUSTOM_BOOTOPTIONS="ssh=password lang=us keyboard=us tz=Asia/Shanghai services=networking debnet toram"
```

7. 如果原系统不是 debian, 但只要网络支持 dhcp, 你还可以使用下面的配置

```shell
CUSTOM_BOOTOPTIONS="ssh=password lang=us keyboard=us tz=Asia/Shanghai toram"
```

> 还可以配置使用静态地址, 有需要的可以看看官方的[文档](http://grml.org/cheatcodes/)

8. 更新 grub 配置

```shell
update-grub
```

9. 让机器下一次启动的时候引导 grml

```shell
# 使用 full iso 的使用如下命令
grub-reboot "Grml Rescue System (grml64-full_2022.11.iso)"
# 使用 small iso 的使用如下命令
grub-reboot "Grml Rescue System (grml64-small_2022.11.iso)"
```

10. 重启服务器

```shell
shutdown -r now
```

:::tip PS:

1. 如果因为某种原因在重启后无法登录到 ssh, 只需在你的 VPS/服务器 面板重启一下即可恢复到之前的系统

2. 重启进入系统后, 如果网络服务启动失败, 有如下提示信息: ifup waiting for lock on /run/network/ifstate.eth0
   - 执行 rm -rf /run/network/ifstate.eth0 先删除对应文件
   - 再执行 systemctl stop networking, systemctl start networking
   - 执行成功后, 修改 /etc/resolv.conf 文件, 添加 nameserver 114.114.114.114
3. 现在网络修复完成, 可以使用 ssh 远程进行连接

:::

## Arch安装

1. 下面的所有操作步骤都是在 Grml live 系统里面完成, 确保上述的配置完成, 首先下载 archlinux-bootstrap 并解压

```shell
cd /tmp
wget https://geo.mirror.pkgbuild.com/iso/latest/archlinux-bootstrap-x86_64.tar.gz
```

2. 由于整个 grml live 系统运行在内存里, 解压完成后务必删掉压缩包, 保证内存空间充足

```shell
tar -zxvf archlinux-bootstrap-x86_64.tar.gz
rm -rf archlinux-bootstrap-x86_64.tar.gz
```

3. 源配置文件

```shell
vim /tmp/root.x86_64/etc/pacman.d/mirrorlist
```

4. 选择一个合适的镜像源, 取消注释

```sh
# 这里我选择德国的一个镜像源
Server = https://mirror.metalgamer.eu/archlinux/$repo/os/$arch

# 下面是一些镜像源选择
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch # 中科大
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch # 清华
Server = https://mirror.archlinux.tw/ArchLinux/$repo/os/$arch   # 东亚地区: 中华民国
Server = https://mirror.0xem.ma/arch/$repo/os/$arch    # 北美洲地区: 加拿大
Server = https://mirror.aktkn.sg/archlinux/$repo/os/$arch    # 东南亚地区: 新加坡
Server = https://archlinux.uk.mirror.allworldit.com/archlinux/$repo/os/$arch    # 欧洲地区: 英国
Server = https://mirrors.cat.net/archlinux/$repo/os/$arch    # 东亚地区: 日本
```

5. 避免 chroot 后提示硬盘空间不足

```shell
mount --bind root.x86_64 root.x86_64
```

6. chroot

```shell
/tmp/root.x86_64/bin/arch-chroot /tmp/root.x86_64/
```

7. 初始化 key

```shell
pacman-key --init
pacman-key --populate archlinux
```

8. 更新系统并安装分区需要用到的工具

```shell
pacman -Syyu
pacman -S dosfstools parted
```

9. 分区

```shell
# 首先将磁盘转换为 gpt 类型, 这里假设比如你想安装的磁盘名称为 vda, 如果你使用 NVME 的固态硬盘, 你看到的磁盘名称可能为 nvme0n1
lsblk                       # 显示分区情况 找到你想安装的磁盘名称
parted /dev/vda             # 执行 parted, 进入交互式命令行，进行磁盘类型变更
(parted)mktable             # 输入 mktable
New disk label type? gpt    # 输入 gpt 将磁盘类型转换为 gpt 如磁盘有数据会警告, 输入 yes 即可
quit                        # 最后 quit 退出 parted 命令行交互

cfdisk /dev/vda # 来执行分区操作, 分配各个分区大小, 类型
# bios 引导需要分 BIOS boot, Linux Swap, Linux filesystem
# uefi 引导需要分 EFI System, Linux Swap, Linux filesystem
fdisk -l # 分区结束后, 复查磁盘情况
```

10. 格式化

```shell
mkfs.ext4  /dev/vda3            # 格式化根目录
mkfs.vfat  /dev/vda1            # 格式化 efi 分区, 仅 uefi 引导需要
mkswap /dev/vda2				# 初始化 swap 分区
mount /dev/vda3 /mnt			# 挂载分区
swapon /dev/vda2				# 启用 swap
# 仅 uefi 分区需要
mount --mkdir /dev/vda1 /mnt/efi
```

11. 安装基本软件包

```shell
pacstrap /mnt base base-devel linux linux-headers linux-firmware dhcpcd iwd vim bash-completion grub openssh
```

12. 生成 fstab 配置文件

```shell
genfstab -U /mnt >> /mnt/etc/fstab
```

13. 执行 `exit` 退出 chroot 环境
14. 重新进入

```shell
/tmp/root.x86_64/bin/arch-chroot /tmp/root.x86_64/mnt
```

15. 时区配置

```shell
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc
systemctl enable systemd-timesyncd.service
```

16. 配置语言环境, 放开 en_US.UTF-8 所在行以及 zh_CN.UTF-8 所在行的注释符号

```shell
vim /etc/locale.gen
```

17. 用如下命令生成 locale

```shell
locale-gen
```

18. 向 /etc/locale.conf 导入内容

```shell
echo 'LANG=en_US.UTF-8'  > /etc/locale.conf
```

19. 设置主机名

```shell
# 加入你想为主机取的主机名, 例如: ArchLinux
vim /etc/hostname

# 同时在 /etc/hosts 设置与其匹配的条目
vim /etc/hosts

# 加入如下内容
127.0.0.1   localhost
::1         localhost
127.0.1.1   ArchLinux
```

20. 设置网络, ip 地址可使用 `ip addr` 列出当前 ip 信息作参考

```shell
vim /etc/systemd/network/20-wired.network
```

配置如下:

```sh
[Match]
Name=eth0

[Network]
Address=xx.xx.xx.xx/24 # ipv4 地址
Address=xxx:xxx:xxx:xxx:xxx:xxx:xxx:xxx/80 # ipv6 地址
IPv6AcceptRA=no

[Route]
Gateway=x.xx.xx.1
GatewayOnLink=yes

[Route]
Gateway=xxx:xxx:xxx::1/80
GatewayOnLink=ye
```

如果网络支持dhcp, systemd-networkd的 dhcp 配置可如下配置

```shell
[Match]
Name=eth0

[Network]
DHCP=yes
```

:::info tip

更多关于systemd-networkd的内容可以参考：[systemd-networkd](https://wiki.archlinuxcn.org/wiki/Systemd-networkd)

:::

设置 systemd-networkd 开机自启

```shell
systemctl enable systemd-networkd
```

21. 配置 dns

```shell
nameserver 8.8.8.8
nameserver 2001:4860:4860::8888
nameserver 8.8.4.4
nameserver 2001:4860:4860::8844
```

22. 设置 root 用户名密码

```shell
passwd root
```

23. 设置 ssh 服务, 具体内容见: [ssh 免密配置](../syserver/syserver001.md)

24. 安装 grub

```shell
pacman -S grub
# 对于 bios 引导的机器请使用下面的命令, 注意是安装 grub 到硬盘而不是某一个分区
grub-install --target=i386-pc /dev/vda
# 如果使用 uefi 引导, 则还需要安装 efibootmgr
pacman -S efibootmgr
# 然后使用下面的命令安装 grub
grub-install --target=x86_64-efi --efi-directory=/efi --bootloader-id=GRUB
# 编辑配置文件, 去掉 GRUB_CMDLINE_LINUX_DEFAULT 参数的 quit
# 添加 net.ifnames=0(避免机器重启后, 网卡接口名无法与 systemd-networkd 内配置的接口名相匹配, 从而导致机器失联)
# 添加 nowatchdog(提高开关机速度), 把 log level 的数值从 3 改成 5(出现系统错误方便排错)
vim /etc/default/grub
# 生成 GRUB 所需的配置文件
grub-mkconfig -o /boot/grub/grub.cfg
```

25. 退出 chroot 环境并重启

```shell
exit
shutdown -r now
```

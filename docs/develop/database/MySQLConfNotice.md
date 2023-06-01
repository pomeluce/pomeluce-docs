# MySQL 配置文件注意点

## 1.编码配置注意事项: 

* 在 my.cnf/my.ini 配置文件中, 下面的字符集和字符序编码格式必须保持一致, 否则 mysql 将无法使用, 在 docker 容器中 mysql 会出现 container is not running 错误;

```ini
character-set-server=UTF8MB4
collation-server=UTF8MB4_general_ci
```


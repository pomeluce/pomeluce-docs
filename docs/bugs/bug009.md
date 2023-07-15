# MySQL 数据修改异常

## 1.现象及原因

* <span style='background: yellow; color: black;'>当表没有主键, 且存在完全重复数据时, 修改时无法修改</span>

* 原因: <span style='color: red;'>因为没有主键, 且存在完全相同数据, 修改时无法判断修改哪一条数据</span>

## 2.解决方案

* 添加 limit 字段

```sql
update 表明 set 修改数据 where 修改条件 limit 1
```


# MyBatis不支持类型错误

## 1.报错信息

<span style='color: red;'>java.lang.UnsupportedOperationException</span>

## 2.原因

查询数据返回的是 List 集合, 要使用 list 集合中元素类型作为 resultType, 不能直接使用 List 返回
# Hibernate通配符(?)报错

## 1.报错信息:

* <span style='color: red;'>org.hibernate.query.SemanticException: Unlabeled ordinal parameter ('?' rather than ?1)</span>

## 2.错误原因

* 从 Hibernate 5.3 版本开始, 已删除对 HQL/JPQL 查询中的旧式查询参数 ('?') 声明的支持

## 3.解决方案

* <span style='background: yellow'>将 column = ? 改为 column = :value 即可</span>

```java
Query<Person> query = HibernateTest.getSession().createQuery("from Person person where person.pid = :pid", Person.class).setParameter("pid", 1001);
```


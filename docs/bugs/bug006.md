# LocalDateTime 转 Json 返回时间戳

## 1.现象及原因

1. 现象: 在 spirngboot 中将数据以 json 形式返回前端, 实体类中的时间类型为 LocalDateTime 类型, springboot 默认的 jackson 会默认将其转换为时间戳返回, fastjson 也一样.
2. 原因: LocalDateTime 类型为 JDK8 之后的新日期类型, 原来的 @DateTimeFormat 注解无法进行转换处理, jackson 和 fastjson 也无法格式化转换处理

## 2.解决方案

在 jackson 中其实是能够格式化处理该日期类型的, 只不过默认转换为时间戳, 需要手动设置

* 注解

```java
@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
```

* 依赖

```xml
<dependency>
    <groupId>com.fasterxml.jackson.datatype</groupId>
    <artifactId>jackson-datatype-jsr310</artifactId>
    <version>2.13.3</version>
</dependency>
```

* application.properties

```properties
# 配置 jackson 不要将 LocalDateTime 转换为时间戳
spring.jackson.serialization.write-dates-as-timestamps=false
```


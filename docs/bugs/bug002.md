# Struts 配置通配符报错

## 1.原因分析

* struts 2.5 版本之后, 为了提升安全性，默认开启了严格的方法调用

## 2.解决方案

1. 在 package 上面, 设置 strict-method-invocation 为 false, 关闭严格方法调用

```xml
<package name="struts" namespace="/" extends="struts-default" strict-method-invocation="false"></package>
```

2. 在 package 中设置 global-allowed-methods 开启通配符方法调用

```xml
<global-allowed-methods>regex:.*</global-allowed-methods>
```

3. 使用通配符调用方法时, 内部会验证是否允许访问该方法, 所以可以在 action 中设置允许通配符访问的方法

```xml
<allowed-methods>insert, delete</allowed-methods> 使用时放在 <result>...</result> 之后
```

:::tip PS: xml 头部更新为 2.5 版本:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE struts PUBLIC
        "-//Apache Software Foundation//DTD Struts Configuration 2.5//EN"
        "http://struts.apache.org/dtds/struts-2.5.dtd">
<strust>...</strust>
```

:::
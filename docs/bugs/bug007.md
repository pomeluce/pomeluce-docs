# Tomcat 相关错误

## Tomcat 启动排错

### 1.报错信息 

* <span style='color: red;'>org.apache.jasper.servlet.TldScanner.scanJars 至少有一个JAR被扫描用于TLD但尚未包含TLD</span>

### 2.解决办法

 在 resource 文件夹下添加 logging.properties 文件, 加入如下信息可查看到具体报错信息

```properties
org.apache.catalina.core.ContainerBase.[Catalina].level=INFO
org.apache.catalina.core.ContainerBase.[Catalina].handlers=java.util.logging.ConsoleHandler
```

## Tomcat 页面中文乱码解决办法

在 IDEA 的 tomcat 配置的 VM options 选项中加入如下内容

```java
-Dfile.encoding="UTF-8"  
```


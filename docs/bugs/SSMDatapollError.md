# SSM 项目连接池引用 properties 连接失败

* 解决方案: <span style='color: red'>在 spring-application.xml 配置文件中, 引用 properties 文件加载 c3p0 连接池, 引用的是计算机名, 而不是数据库用户名</span>

* 错误原因: properties 文件中用户名的 <span style='background: yellow; color: black;'>key 不要使用 username</span>, 否则会读取计算机的用户名, 而不是数据库用户名

# SSH整合Struts配置路径

* struts.xml 配置文件默认放在 resource 根目录, 如果没有放到根目录, 需要在 web.xml 的前端控制器做如下配置

* 配置: <span style='background: yellow; color: black;'>添加 \<init-param> 配置, 在 param-value 中指定 struts.xml 的文件位置, 并添加 struts-default.xml, struts-plugin.xml (默认不用配置, 手动指定时需要添加)</span>

```xml
<!-- 前端控制器 -->
<filter>
    <filter-name>struts2</filter-name>
    <filter-class>org.apache.struts2.dispatcher.filter.StrutsPrepareAndExecuteFilter</filter-class>
    <init-param>
        <!--
        	告诉struts2, struts.xml文件的读取位置
        -->
        <param-name>config</param-name>
        <param-value>
            struts-default.xml,
            struts-plugin.xml,
            struts/struts.xml
        </param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>struts2</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```


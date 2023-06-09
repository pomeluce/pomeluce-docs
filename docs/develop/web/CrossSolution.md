# 跨域问题的解决方案

## 1.Jsonp

**Jsonp跨域的原理**

```
利用<script>标签没有跨域限制，通过<script>标签src属性，发送带有callback参数的GET请求，服务端将接口返回数据拼凑到callback函数中，返回给浏览器，浏览器解析执行，从而前端拿到callback函数返回的数据
```

* 缺点: 只能发送GET请求

**代码实现**

```js
const express = require('express');
const app = express();

//TODO: jsonp必须在cors之前挂载
app.get('/jsonp', (req, res) => {
    //1.通过请求参数获取回调函数名称
    const funcName = req.query.callback;
    //2.定义响应给客户端的数据
    const data = {username: '江东小儿', age: 43, gender: '男'};
    //3.拼接函数调用的字符串
    const scriptStr = `${funcName}(${JSON.stringify(data)})`;
    //4.响应数据给客户端
    res.send(scriptStr);
})

app.listen(8880, () => {
    console.log('express server running at http://localhost:8880')
})
```

## 2.Node+Express+Cors

1. 通过npm安装cors中间件

```bash
npm install cors
```

2. 在配置路由模块之前导入并注册cors中间件

```javascript
const express = require('express');
const app = express();

//导入cors中间件
const cors = require('cors');
//注册cors中间件
app.use(cors());
//导入路由模块
const router = require('./016-apiRouter');
//解析表单数据
app.use(express.urlencoded({extended: false}))
//注册路由模块
app.use('/api', router)

app.listen(8880, () => {
    console.log("express server running at http://localhost:8880")
})
```

路由模块

```js
const express = require('express');
//导入路由模块
const router = express.Router();
//定义post接口
router.post('/post', (req, res) => {
    const body = req.body;
    res.send({status: 0, message: "post请求成功", data: body})
})

//定义delete接口
router.delete('/delete', (req, res) => {
    const body = req.body;
    res.send({status: 0, message: "post请求成功", data: body})
})
//对外公开router属性
module.exports = router;
```

## 3.Nginx

1. 原理

```
nginx代理跨域，实质和CORS跨域原理一样，通过配置文件设置请求响应头Access-Control-Allow-Origin…等字段实现跨域
```

2. 配置

```nginx
location / {  
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
	#配置预检请求响应
    if ($request_method = 'OPTIONS') {
        return 204;
    }
}
```

## 4.Filter

1. 原理

```
使用Filter过滤器来过滤服务请求,向请求端设置Response Header(响应头部)的Access-Control-Allow-Origin等属性声明允许跨域访问
```

2.配置

```java
package org.top.filter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(filterName = "CorsFilter")
public class CorsFilter implements Filter {
    public void init(FilterConfig config) throws ServletException {
    }

    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws ServletException, IOException {
        //向下转型,扩充request方法
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        //设置编码,处理乱码问题
        request.setCharacterEncoding("utf-8");
        response.setContentType("text/html; charset=utf-8");
        //处理跨域请求
        /* 允许跨域的主机地址 */
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
        /* 允许跨域的请求方法GET, POST, HEAD 等 */
        response.setHeader("Access-Control-Allow-Methods", "*");
        /* 重新预检验跨域的缓存时间 (s) */
        response.setHeader("Access-Control-Max-Age", "3600");
        /* 允许跨域的请求头 */
        response.setHeader("Access-Control-Allow-Headers", "*");
        /* 是否携带cookie */
        response.setHeader("Access-Control-Allow-Credentials", "true");
        chain.doFilter(req, res);
    }
}
```

## 5.HandlerInterceptor

1. 原理

```
通过拦截器的preHandler方法,在请求处理之前,配置Response Header(响应头部)的Access-Control-Allow-Origin等属性声明允许跨域访问
```

2. 配置

```java
package org.top.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CorsInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //处理跨域请求
        /* 允许跨域的主机地址 */
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
        /* 允许跨域的请求方法GET, POST, HEAD 等 */
        response.setHeader("Access-Control-Allow-Methods", "*");
        /* 重新预检验跨域的缓存时间 (s) */
        response.setHeader("Access-Control-Max-Age", "3600");
        /* 允许跨域的请求头 */
        response.setHeader("Access-Control-Allow-Headers", "*");
        /* 是否携带cookie */
        response.setHeader("Access-Control-Allow-Credentials", "true");
        return true;
    }
}
```

## 6.Tomcat

1. 原理

```
Tomcat在7.0.41版本开始内置了CorsFilter,通过内置的CorsFilter配置Response Header(响应头部)的Access-Control-Allow-Origin等属性声明允许跨域访问
```

2. 配置

```xml
<filter>
    <filter-name>corsFilter</filter-name>
    <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
    <!--允许跨域的主机地址-->
    <init-param>
        <param-name>cors.allowed.origins</param-name>
        <param-value>http://localhost:8080</param-value>
    </init-param>
    <!--允许跨域的请求方法GET, POST, HEAD等-->
    <init-param>
        <param-name>cors.allowed.methods</param-name>
        <param-value>*</param-value>
    </init-param>
    <!--重新预检验跨域的缓存时间(s)-->
    <init-param>
        <param-name>cors.allowed.headers</param-name>
        <param-value>*</param-value>
    </init-param>
    <!--允许跨域的请求头-->
    <init-param>
        <param-name>cors.preflight.maxage</param-name>
        <param-value>3600</param-value>
    </init-param>
    <!--是否携带cookie-->
    <init-param>
        <param-name>cors.support.credentials</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>corsFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```


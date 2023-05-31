# Cors跨域资源共享

## 1.Cors简介

* CORS(Cross-Origin Resource Sharing, 跨域资源共享)由一系列 HTTP 响应头组成, 这些 HTTP 响应头决定浏览器是否阻止前端JS代码跨域获取资源
* 浏览器的同源安全策略默认会阻止网页"跨域"获取资源, 但如果接口服务器配置了 CORS 相关的 HTTP 响应头, 就可以解除浏览器端的跨域访问限制

## 2.Cors响应头信息

1. Cors响应头部:Access-Control-Allow-Origin

```javascript
Access-Control-Allow-Origin: <origin> | * , origin参数的值指定了允许访问该资源的外域URL
//只允许www.baidu.com的请求
res.setHeader('Access-Control-Allow-Origin', 'http://www.baidu.com')
//运行所有网页都能请求
res.setHeader('Access-Control-Allow-Origin', '*')
/*
	注意:当origin参数设置为通配符*时,将无法响应携带身份信息(Cookie或者HTTP认证信息)的HTTP请求
*/
```

2. Cors响应头部:Access-Control-Allow-Headers

```js
1. 默认情况下,Cors仅支持客户端向服务器发送如下的9个请求头:
	Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type(值仅限于 text/plain、multipart/form-data、application/x-www-form-urlencoded三者之一)
2. 如果客户端向服务器发送了额外的请求头信息，则需要在服务器端，通过 Access-Control-Allow-Headers 对额外的请求头进行声明
//手动设置Content-Type, X-Custom-Header请求头
res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Custom-Header');
```

3. Cors响应头部:Access-Control-Allow-Methods

```js
1. 默认情况下，Cors仅支持客户端发起GET、POST、HEAD 请求
2. 如果客户端希望通过 PUT、DELETE 等方式请求服务器的资源，则需要在服务器端，通过Access-Control-Alow-Methods来指明实际请求所允许使用的HTTP方法

//设置只允许发送post, put, delete请求
res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, DELETE')
//设置允许所有http请求
res.setHeader('Access-Control-Allow-Methods', '*')
```

4. Cors响应头部:Access-Control-Allow-Credentials

```js
它的值是一个布尔值,表示是否允许发送cookies,authorization,headers或TLS client certificates等身份信息。
1. CORS请求默认不发送Cookie和HTTP认证信息
2. 设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。
3. 这个值只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可
4. 必须在AJAX请求中打开withCredentials属性,否则,即使服务器同意发送Cookie,浏览器也不会发送或处理
res.setHeader('Access-Control-Allow-Credentials', true)
```

5. Cors响应头部:Access-Control-Max-Age

```js
单位为秒,指定浏览器在本次预检请求的有效期内,无需再发送预检请求进行协商,直接用本次协商结果即可
res.setHeader('Access-Control-Max-Age', 30)
```

6. Cors响应头部:Access-Control-Expose-Headers

```js
1. 跨域请求时,客户端xhr对象的getResponseHeader()方法只能拿到6个基本字段，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。
2. 要获取其他字段时，使用Access-Control-Expose-Headers,xhr.getResponseHeader('name')可以返回我们所需的值
//设置字段
 res.setHeader("Access-Control-Expose-Headers","name");
//获取字段
xhr.getResponseHeader('name');
```

## 3.Cors请求分类

客户端在请求CORS接口时,根据请求方式和请求头的不同,可以将CORS的请求分为两大类

1. 简单请求

```
1.请求方式：GET、POST、HEAD 三者之一
2.HTTP 头部信息不超过以下几种字段：无自定义头部字段、Accept、Accept-Language、Content-Language、DPR、Downlink、Save-Data、Viewport-Width、Width 、Content-Type(只有三个值application/x-www-form-urlencoded、multipart/form-data、text/plain)
```

**注意: 简单请求,Origin字段为必选项,其他字段为可选项**

2. 预检请求

```
1.只要符合以下任何一个条件的请求,都需要进行预检请求：
	a.请求方式为 GET、POST、HEAD 之外的请求 Method 类型
	b.请求头中包含自定义头部字段
	c.向服务器发送了 application/json 格式的数据
2.在浏览器与服务器正式通信之前，浏览器会先发送OPTION请求进行预检，以获知服务器是否允许该实际请求，所以这一次的OPTION请求称为“预检请求”。服务器成功响应预检请求后，才会发送真正的请求，并且携带真实数据
```

**注意: 简单请求,Origin,Hearders,Methods字段为必选项,其他字段为可选项**


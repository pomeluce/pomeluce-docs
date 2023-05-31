# restful 接口规范

## 1.url 接口语法

url通用接口如下: `URI = scheme"://"host:port"/"path["?"query]["#"fragment]`

* scheme: 指底层用的协议，如http、https、ftp
* host: 服务器的IP地址或者域名
* port: 端口，http中默认80
* path: 访问资源的路径，就是咱们各种web 框架中定义的route路由
* query: 为发送给服务器的参数
* fragment: 锚点，定位到页面的资源，锚点为资源id

## 2.api 设计

### 1.url 的定义

* URL 中不能有动词
* URL 结尾不应该包含斜杠 "/"
* 正斜杠分隔符 "/" 必须用来指示层级关系
* 应该使用连字符 "-" 来提高 URL 的可读性, 而不是使用下划线 "_"
* URL 路径中首选小写字母
* URL 路径名词均为复数

### 2.api对资源的操作

* **CRUD 操作**

  | 操作   |                       解释                       |
  | ------ | :----------------------------------------------: |
  | GET    |                     获取资源                     |
  | POST   |                     新建资源                     |
  | PUT    | 在服务器更新资源（向客户端提供改变后的所有资源） |
  | PATCH  |    在服务器更新资源（向客户端提供改变的属性）    |
  | DELETE |                     删除资源                     |


*  **资源过滤, 在获取资源的时候，有可能需要获取某些“过滤”后的资源，例如指定前10行数据**

  ```http
  http://api.user.com/schools/grades/classes/boys?page=1&page-size=10
  ```

* **返回状态码(推荐标准HTTP状态码)**

  有很多服务器将返回状态码一直设为 200, 然后在返回 body 里面自定义一些状态码来表示服务器返回结果的状态码, 由于 rest api 是直接使用的 HTTP 协议, 所以它的状态码也要尽量使用HTTP协议的状态码

* **返回结果**

  | 操作                   | 结果                 |
  | ---------------------- | -------------------- |
  | GET/collections        | 返回资源列表         |
  | GET/collections/:id    | 返回单独的资源       |
  | POST/collections       | 返回新生成的资源对象 |
  | PUT/collections/:id    | 返回完整的资源对象   |
  | PATCH/collections/:id  | 返回被修改的属性     |
  | DELETE/collections/:id | 返回一个空文档       |



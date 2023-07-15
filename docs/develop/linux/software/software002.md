# ElasticSearch 相关

## Elastic无法连接及密码

1. ElasticSearch 无法连接原因: 修改 elasticsearch.yml 中的如下配置, 关闭 ssl 验证

```yaml
# Enable encryption and mutual authentication between cluster nodes
xpack.security.http.ssl:
  enabled: false
  keystore.path: certs/http.p12
```

2. 关闭 ssl 验证后, 访问需要密码: 修改 elasticsearch.yml 中的如下配置, 关闭密码验证

```yaml
# Enable security features
xpack.security.enabled: false
```

## Elastic操作相关错误

1. ElasticSearch 无法获取数据: 使用 ElasticsearchRestTemplate 对象进行 search 操作时, 发送的请求 url 和端口不按配置文件走: **注意在那个模块里使用的 restTemplate 对象调用方法, 就在对应的配置文件中配置地址和端口**

```properties
spring.elasticsearch.rest.uris=10.10.92.189:2900
```

2. Elasticsearch 操作报错 [reason=Fielddata is disabled on text fields by default]: 在分组统计时, 默认情况下 text 类型的 Fielddata 是被禁用的, 解决方式如下:

* 我们可以用 fieldname.keyword 进行聚合、排序, 代码修改为如下

```java
AggregationBuilders.terms("skuCategorygroup").field("category.keyword").size(50));
```

* 设置字段的 fielddata=true, *~~不推荐, 这样可能会使用大量的内存~~*

```json
PUT /索引名称/_mapping/doc
{
    "properties": {
        "category": { 
            "type": "text",
            "fielddata": true
        }
    }
}
```

3. 在使用 QueryBuilders 对象的设置查询条件时, **需要注意如果查询的字段时 text 类型, 需要以 queryName.keyword 的形式设置查询条件**, 否则可能无法查询处数据

```java
boolQueryBuilder.filter(QueryBuilders.termQuery("brand.keyword", searchMap.get("brand")));
```


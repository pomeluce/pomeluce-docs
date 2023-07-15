# Long 转 Json 精度缺失

## 1.错误信息

* 现象: 后台是 Long 类型时, 前端只能保留 17 位, 后两位用 00 补充

## 2.错误原因

 Java 中的 Long 能表示的范围比 js 中 number 大, 通过 json 传递给前端 js 解析时, 会出现精度损失

## 3.解决方案 

* 局部配置: 在对应的属性上加如下注解, 将 Long 类型数据在封装为 json 时转换为 string 类型, <span style='color: red;'>被转换字段必须为**包装类型**</span>

```java
@JsonSerialize(using = ToStringSerializer.class)
```

* ~~全局配置: 在配置文件中, 配置如下参数, 缺点是颗粒度太大，所有的数字都被转成字符串输出~~(*测试无效*)

```properties
# 配置序列化是将所有数值类型的数据转换为字符类型
spring.jackson.generator.write-numbers-as-strings=true
```

* ~~ObjectMapper: 自定义 ObjectMapperConfig 只对 long/Long 类型进行转换~~(*测试无效*)

```java
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author : kevin
 * @version 1.0
 * @date : 2022/8/9上午9:55
 * @className : LongToStringConfig
 * @description : TODO: Long/long 类型 json 序列化转 String, 防止 Long 数据长度过长, 前端精度损失
 */
@Configuration
public class LongToStringConfig {
    public @Bean Jackson2ObjectMapperBuilderCustomizer jsonObjectMapper() {
        return jsonObjectMapper -> jsonObjectMapper
            .serializerByType(Long.class, ToStringSerializer.instance)
            .serializerByType(Long.TYPE, ToStringSerializer.instance);
    }
}
```

::: danger Ps:

不要在 Result 工具类中使用其他(如: fastjson) json 工具类处理 data 数据, 否则在 SpringBoot 返回数据时, 不会再处理已经是 json 的数据, 统一让 SpringBoot 返回数据是去序列化为 json 数据

:::
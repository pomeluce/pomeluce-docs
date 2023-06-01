# @Value 注解 static 属性无效

1. 错误信息: <span style='color: red'>xxx is null</span>
2. 解决方案: 使用 set 方式注入, 将类使用 component 注入到 spring 容器中

```java
public class JwtUtils {
    private static String TOKEN_ENCRYPT_KEY;

    @Value("${token.key}")
    private void setTokenEncryptKey(String tokenEncryptKey) {
        JwtUtils.TOKEN_ENCRYPT_KEY = tokenEncryptKey;
    }
}
```


# Feign 出现500错误

## 1.错误信息

* `feign.FeignException$InternalServerError: [500]`

## 2.原因及解决方案

1. Feign 接口注解注册信息有误: @FeignClient(value = "...", path = "..."), **应注意使用 value, 而不是 name**, 且注意当前 Feign 尽量不要使用 @RequestMapping 注解, **而是在 path 中填写**

2. 调用过程中, 如果用对象的调用, 一定要检查对象的泛型是否正确

3. **被 Feign 远程调用的方法存在异常, 也是报 500 错误**
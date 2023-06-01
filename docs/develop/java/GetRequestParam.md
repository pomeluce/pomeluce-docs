# Get 请求参数接受

## 1.不带任何注解直接接收

1. 请求:

```http
http://localhost:8080/employee/page?currentPage=1&pageSize=10
```

2. controlller

```java
/**
 * 根据 当前页信息, 页容量, 查询条件 进行所有员工的分页查询操作
 *
 * @param queryPage 接受当前页, 页容量, 查询条件等参数
 * @return 返回包含分页对象的 json 数据
 */
@GetMapping("/page")
public Result<Page<Employee>> queryAll(QueryPage queryPage) {
    return employeeService.queryAll(queryPage);
}
```

## 2.ModelAttribute注解接收

1. 请求:

```http
http://localhost:8080/employee/page?currentPage=1&pageSize=10
```

2. controller

```java
/**
 * 根据 当前页信息, 页容量, 查询条件 进行所有员工的分页查询操作
 *
 * @param queryPage 接受当前页, 页容量, 查询条件等参数
 * @return 返回包含分页对象的 json 数据
 */
@GetMapping("/page")
public Result<Page<Employee>> queryAll(@ModelAttribute QueryPage queryPage) {
    return employeeService.queryAll(queryPage);
}
```

 
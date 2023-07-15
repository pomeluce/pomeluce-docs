# Js中三元运算的简写

## 1.|| 用法

1. 语法:

```js
原: 
let result = var1 ? var1 : var2
简: 
let result = var1 || var;
```

2. 分析:

* 逻辑运算符通常用于布尔型值, 它们返回一个布尔值. 然而, 在 javascript 中, && 和 || 运算符会返回一个指定操作数的值, 因此, 这些运算符也用于非布尔值. 这时, 它们也就会返回一个非布尔型值
* expr1 || expr2 若 expr1 可转换为 true, 则返回 expr1, 否则, 返回 expr2
* 会被转换为 false 的表达式有: null, NaN, 0, 空字符串("" or '' or ``), undefinedfined


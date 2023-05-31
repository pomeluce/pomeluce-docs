# Js中的if判断条件

## 1.变量类型

**1. 已定义变量,但未赋值**

```javascript
let flag1;
if (flag1) console.log("条件为真--->已定义未赋值")
else console.log("添加为假--->已定义未赋值")
```

:::tip 运行结果：

添加为假--->已定义未赋值

:::

**2. 已定义变量,赋值为字符串**

```javascript
let flag2 = '', flag3 = ' ';
if (flag2) console.log("条件为真--->已定义赋值为空串")
else console.log("条件为假--->已定义赋值为空串")

if (flag3) console.log("条件为真--->已定义赋值不为空串")
else console.log("条件为假--->已定义赋值不为空串")
```

:::tip 运行结果：

条件为假--->已定义赋值为空串

条件为真--->已定义赋值不为空串

:::

**3. 已定义变量,赋值为boolean**

```javascript
let flag4 = true, flag5 = false;
if (flag4) console.log("条件为真--->已定义赋值为true")
else console.log("条件为假--->已定义赋值为true")

if (flag4) console.log("条件为真--->已定义赋值为false")
else console.log("条件为假--->已定义赋值为false")
```

:::tip 运行结果：

条件为真--->已定义赋值为true

条件为假--->已定义赋值为false

:::

**4. 已定义变量,赋值为int**

```javascript
let flag6 = 0, flag7 = 0.0, flag8 = 3;
if (flag6) console.log("条件为真--->已定义赋值为0")
else console.log("条件为假--->已定义赋值为0")

if (flag7) console.log("条件为真--->已定义赋值为0.0")
else console.log("条件为假--->已定义赋值为0.0")

if (flag8) console.log("条件为真--->已定义赋值为3")
else console.log("条件为假--->已定义赋值为3")
```

:::tip 运行结果：

条件为假--->已定义赋值为0

条件为假--->已定义赋值为0.0

条件为真--->已定义赋值为3

:::

## 2.函数类型

**1. 已定义函数,不带括号**

```javascript
function flag11() {}

if (flag11) console.log("条件为真--->已定义函数不带括号")
else console.log("条件为假--->已定义函数不带括号")
```

:::tip 运行结果：

条件为真--->已定义函数不带括号

:::

**2. 已定义函数,带括号**

* 相当于调用函数，根据函数的**返回值判断真假**

```javascript
function flag12() {}

if (flag12()) console.log("条件为真--->已定义函数带括号-->无返回值")
else console.log("条件为假--->已定义函数带括号-->无返回值")

function flag13() {return true}

if (flag13()) console.log("条件为真--->已定义函数带括号-->返回值为true")
else console.log("条件为假--->已定义函数带括号-->返回值为true")
```

:::tip 运行结果：

条件为假--->已定义函数带括号-->无返回值

条件为真--->已定义函数带括号-->返回值为true

:::

## 3.对象类型

**1. 已定义对象,未赋值和已赋值**

* 对象未赋值时，类型未被定义，所有同未赋值的变量一样

```javascript
let flag14, flag15 = {};
if (flag14) console.log("条件为真--->已定义对象未赋值")
else console.log("条件为假--->已定义对象未赋值")

if (flag15) console.log("条件为真--->已定义对象已赋值")
else console.log("条件为假--->已定义对象已赋值")
```

:::tip 运行结果：

条件为假--->已定义对象未赋值

条件为真--->已定义对象已赋值

:::

**2. 已定义对象的属性**

* 对象的属性字段同单独的变量一样，==所以同变量类型一样处理==

```javascript
let flag16 = {name: '张三', age: 23, status: true}

if (flag16.name) console.log("条件为真--->name不为空串")
else console.log("条件为假--->name不为空串")
flag16.name = '';
if (flag16.name) console.log("条件为真--->name为空串")
else console.log("条件为假--->name为空串")

if (flag16.age) console.log("条件为真--->age为26")
else console.log("条件为假--->age为26")
flag16.age = 0;
if (flag16.age) console.log("条件为真--->age为0")
else console.log("条件为假--->age为0")

if (flag16.status) console.log("条件为真--->status为true")
else console.log("条件为假--->status为true")
flag16.status = false;
if (flag16.status) console.log("条件为真--->status为false")
else console.log("条件为假--->status为false")
```

:::tip 运行结果：

条件为真--->name不为空串

条件为假--->name为空串

条件为真--->age为26

条件为假--->age为0

条件为真--->status为true

条件为假--->status为false

:::

**3. 已定义对象的方法**

* 对象的方法，和单独的函数一样，==所以同函数类型一样处理==

```javascript
let flag17 = {test01: function () {}, test02: function () {return true}}

if (flag17.test01) console.log("条件为真--->方法不带括号")
else console.log("条件为假--->方法不带括号")

if (flag17.test01()) console.log("条件为真--->方法带括号无返回值")
else console.log("条件为假--->方法带括号无返回值")

if (flag17.test02()) console.log("条件为真--->方法带括号有返回值")
else console.log("条件为假--->方法带括号有返回值")
```

:::tip 运行结果：

条件为真--->方法不带括号

条件为假--->方法带括号无返回值

条件为真--->方法带括号有返回值

:::

## 4.特殊类型

* 变量为特殊值：null, undefined

```javascript
let flag9 = null, flag10 = undefined;
if (flag9) console.log("条件为真--->已定义赋值为null")
else console.log("条件为假--->已定义赋值为null")

if (flag10) console.log("条件为真--->已定义赋值为undefined")
else console.log("条件为假--->已定义赋值为undefined")
```

:::tip 运行结果：

条件为假--->已定义赋值为null

条件为假--->已定义赋值为undefined

:::
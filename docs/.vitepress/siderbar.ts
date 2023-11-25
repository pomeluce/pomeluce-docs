const initList = (names: string[], prefix: string): Array<{ text: string; link: string }> => {
  return Array.from(names, (name, index) => {
    return { text: name, link: `${prefix}${(index + 1).toString().padStart(3, '0')}` };
  });
};

export const siderbarJava = () => {
  return [
    { text: 'Java 基础', collapsed: false, items: initList(javaNames, '/develop/java/javabase/java') },
    { text: 'Spring 框架', collapsed: false, items: initList(springNames, '/develop/java/spring/spring') },
  ];
};

export const siderbarWeb = () => {
  return [
    { text: 'Javascript', collapsed: false, items: initList(jsNames, '/develop/web/javascript/js') },
    { text: 'Other', collapsed: false, items: initList(webOtherNames, '/develop/web/other/other') },
  ];
};

export const siderbarLinux = () => {
  return [
    { text: '系统服务', collapsed: false, items: initList(syserverNames, '/develop/linux/syserver/syserver') },
    { text: '软件配置', collapsed: false, items: initList(softwareNames, '/develop/linux/software/software') },
    { text: 'Nginx 服务', collapsed: false, items: initList(nginxNames, '/develop/linux/nginx/nginx') },
  ];
};

export const siderbarDatabase = () => {
  return [
    { text: 'PostgreSQL', collapsed: false, items: initList(psqlNames, '/develop/database/psql/psql') },
    { text: 'MySql', collapsed: false, items: initList(mysqlNames, '/develop/database/mysql/mysql') },
    { text: 'Redis', collapsed: false, items: initList(redisNames, '/develop/database/redis/redis') },
  ];
};

export const siderbarBug = () => initList(bugNames, '/bugs/bug');

export const siderbarAlgorithm = () => {
  return [
    { text: '设计模式', collapsed: false, items: [] },
    { text: '数据结构', collapsed: false, items: [] },
    { text: '算法题', collapsed: false, items: initList(algorithmTopics, '/algorithm/topic/topic') },
  ];
};

const javaNames: string[] = ['基础知识点'];
const springNames: string[] = ['Restful 接口规范', 'Get 请求参数接受', 'SSH 整合 Struts 配置路径'];

const jsNames: string[] = ['If 判断条件', '三元运算符'];
const webOtherNames: string[] = ['跨域解决方案', 'Cors 跨域资源共享'];

const syserverNames: string[] = ['SSH 免密登录', 'VPS 安装 Arch'];
const softwareNames: string[] = ['Rsnapshot 备份', 'ElasticSerach 配置', 'Redis 安装配置', 'RabbitMQ'];
const nginxNames: string[] = ['Nginx 汇总'];

const psqlNames: string[] = ['PostgreSQL 安装', 'PostgreSQL 语法', 'PostgreSQL 数据类型', 'PostgreSQL DDL'];
const mysqlNames: string[] = ['指定序号自增', 'MySQL 配置注意事项'];
const redisNames: string[] = ['Redis 汇总'];

const bugNames: string[] = [
  'box-shadow 属性无效',
  'Struts2 配置通配符错误',
  'Feign 调用 500 错误',
  'Thymeleaf 错误',
  'Long 转 Json 精度损失',
  'LocalDate 转 Json 格式问题',
  'Tomcat 相关错误',
  'Mybatis 不支持类型错误',
  'MySql 修改异常',
  'Hibernate 通配符错误',
  'SSM 连接池错误',
  '@Value 注解 Static 无效',
];

const algorithmTopics: string[] = ['判断点是否在多边形内'];

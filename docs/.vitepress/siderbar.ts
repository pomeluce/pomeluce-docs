export const siderbarJava = () => {
  return [
    {
      text: 'Java 基础',
      collapsed: false,
      items: [{ text: '基础知识点', link: '/develop/java/JavaBasics' }],
    },
    {
      text: 'Spring 框架',
      collapsed: false,
      items: [
        { text: 'Restful 接口规范', link: '/develop/java/RestSpecification' },
        { text: 'Get 请求参数接受', link: '/develop/java/GetRequestParam' },
        { text: 'SSH 整合 Struts 配置路径', link: '/develop/java/StrutsConfPath' },
      ],
    },
  ];
};

export const siderbarWeb = () => {
  return [
    {
      text: 'Javascript',
      collapsed: false,
      items: [
        { text: 'If 判断条件', link: '/develop/web/IfConditional' },
        { text: '三元运算符', link: '/develop/web/TernaryOperator' },
      ],
    },
    {
      text: 'Other',
      collapsed: false,
      items: [
        { text: '跨域解决方案', link: '/develop/web/CrossSolution' },
        { text: 'Cors 跨域资源共享', link: '/develop/web/CorsResourceShare' },
      ],
    },
  ];
};

export const siderbarLinux = () => {
  return [
    {
      text: '系统服务',
      collapsed: false,
      items: [{ text: 'SSH 免密登录', link: '/develop/linux/SSHPassfree' }],
    },
    {
      text: '软件配置',
      collapsed: false,
      items: [
        { text: 'Rsnapshot 备份', link: '/develop/linux/Rsnapshot' },
        { text: 'ElasticSerach 配置', link: '/develop/linux/ElasticRelevant' },
      ],
    },
  ];
};

export const siderbarDatabase = () => {
  return [
    {
      text: 'MySql',
      collapsed: false,
      items: [
        { text: '指定序号自增', link: '/develop/database/SpecifySerialNum' },
        { text: 'MySQL 配置注意事项', link: '/develop/database/MySQLConfNotice' },
      ],
    },
    {
      text: 'Redis',
      collapsed: false,
      items: [{ text: 'Redis 汇总', link: '/develop/database/RedisMap' }],
    },
    {
      text: 'Nginx',
      collapsed: false,
      items: [{ text: 'Nginx 汇总', link: '/develop/database/NginxMap' }],
    },
  ];
};

export const siderbarBug = () => {
  return [
    { text: 'box-shadow 属性无效', link: '/bugs/BoxShadowInvalid' },
    { text: 'Struts2 配置通配符错误', link: '/bugs/StrutSwildcardError' },
    { text: 'Feign 调用 500 错误', link: '/bugs/Feign500' },
    { text: 'Thymeleaf 错误', link: '/bugs/ThymeleafError' },
    { text: 'Long 转 Json 精度损失', link: '/bugs/LongToJsonPrecisionLoss' },
    { text: 'LocalDate 转 Json 格式问题', link: '/bugs/LocalDateTimestamp' },
    { text: 'Tomcat 相关错误', link: '/bugs/TomcatErrorMap' },
    { text: 'Mybatis 不支持类型错误', link: '/bugs/MyBatisUnsupportOper' },
    { text: 'MySql 修改异常', link: '/bugs/MysqlUpdateError' },
    { text: 'Hibernate 通配符错误', link: '/bugs/HibernateSwildcardError' },
    { text: 'SSM 连接池错误', link: '/bugs/SSMDatapollError' },
    { text: '@Value 注解 Static 无效', link: '/bugs/ValueAnnoStaticInvalid' },
  ];
};

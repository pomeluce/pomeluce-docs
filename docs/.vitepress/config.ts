import { defineConfig } from 'vitepress';

const siderbarJava = () => {
  return [
    {
      text: 'Java 基础',
      collapsed: false,
      items: [{ text: '知识合集', link: '/develop/java/java基础' }],
    },
    {
      text: 'Spring 框架',
      collapsed: false,
      items: [
        { text: 'restful 接口规范', link: '/develop/java/restful接口规范' },
        { text: 'get 请求参数接受', link: '/develop/java/get请求参数接受' },
      ],
    },
  ];
};

const siderbarWeb = () => {
  return [
    {
      text: 'css',
      collapsed: false,
      items: [{ text: 'box-shadow 属性无效', link: '/develop/web/box-shadow属性无效' }],
    },
    {
      text: 'javascript',
      collapsed: false,
      items: [
        { text: 'if 判断条件', link: '/develop/web/js中的if判断条件' },
        { text: '三元运算符', link: '/develop/web/js三元运算符' },
      ],
    },
    {
      text: 'other',
      collapsed: false,
      items: [
        { text: '跨域解决方案', link: '/develop/web/跨域解决方案' },
        { text: 'cors 跨域资源共享', link: '/develop/web/cors跨域资源共享' },
      ],
    },
  ];
};

const siderbarLinux = () => {
  return [
    {
      text: '系统服务',
      collapsed: false,
      items: [{ text: 'ssh 免密登录', link: '/develop/linux/ssh免密登录' }],
    },
    {
      text: '软件配置',
      collapsed: false,
      items: [{ text: 'rsnapshot 备份', link: '/develop/linux/rsnapshot备份' }],
    },
  ];
};

const siderbarDatabase = () => {
  return [
    {
      text: 'MySql',
      collapsed: false,
      items: [{ text: '指定序号自增', link: '/develop/database/指定序号自增' }],
    },
    {
      text: 'Redis',
      collapsed: false,
      items: [{ text: 'redis 合集', link: '/develop/database/redis' }],
    },
  ];
};

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Pomeluce Docs',
  description: 'Pomeluce 文档库',
  base: '/docslibrary/',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outlineTitle: '本页目录',
    nav: [
      { text: '主页', link: '/' },
      {
        text: '技术文档',
        items: [
          {
            text: 'Java 合集',
            link: '/develop/java/java基础',
          },
          {
            text: 'Ts + Vue',
            link: '/develop/web/box-shadow属性无效',
          },
          {
            text: 'Linux 系统',
            link: '/develop/linux/ssh免密登录',
          },
          {
            text: '数据库',
            link: '/develop/database/指定序号自增',
          },
        ],
      },
    ],

    sidebar: {
      '/develop/java/': siderbarJava(),
      '/develop/web/': siderbarWeb(),
      '/develop/linux/': siderbarLinux(),
      '/develop/database/': siderbarDatabase(),
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/pomeluce/docslibrary' }],
    editLink: {
      pattern: 'https://github.com/pomeluce/docslibrary/edit/main/docs/:path',
      text: '在 Github 上编辑此页',
    },
  },
});

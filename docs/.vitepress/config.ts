import { defineConfig } from 'vitepress';
import { siderbarJava, siderbarWeb, siderbarLinux, siderbarDatabase, siderbarBug } from './siderbar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Pomeluce Docs',
  description: 'Pomeluce 文档库',
  head: [['link', { rel: 'icon', href: '/docs/pomeluce.ico' }]],
  base: '/docs/',
  lang: 'zh-CN',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outlineTitle: '本页目录',
    lastUpdatedText: '最后一次更新于',
    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
          },
        },
      },
    },
    nav: [
      { text: '主页', link: '/' },
      {
        text: '技术文档',
        items: [
          {
            text: 'Java 合集',
            link: '/develop/java/JavaBasics',
            activeMatch: '/develop/java/',
          },
          {
            text: 'Ts + Vue',
            link: '/develop/web/IfConditional',
            activeMatch: '/develop/web/',
          },
          {
            text: 'Linux 系统',
            link: '/develop/linux/SSHPassfree',
            activeMatch: '/develop/linux/',
          },
          {
            text: '数据库、中间件',
            link: '/develop/database/SpecifySerialNum',
            activeMatch: '/develop/database/',
          },
        ],
      },
      {
        text: 'Bug 合集',
        link: '/bugs/BoxShadowInvalid',
        activeMatch: '/bugs/',
      },
    ],

    sidebar: {
      '/develop/java/': siderbarJava(),
      '/develop/web/': siderbarWeb(),
      '/develop/linux/': siderbarLinux(),
      '/develop/database/': siderbarDatabase(),
      '/bugs/': siderbarBug(),
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/pomeluce/pomeluce-docs' }],
    editLink: {
      pattern: 'https://github.com/pomeluce/pomeluce-docs/edit/main/docs/:path',
      text: '在 Github 上编辑此页',
    },
  },
});

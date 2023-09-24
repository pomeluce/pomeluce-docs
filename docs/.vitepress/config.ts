import { defineConfig } from 'vitepress';
import markdownItKatex from 'markdown-it-katex';
import { siderbarJava, siderbarWeb, siderbarLinux, siderbarDatabase, siderbarBug, siderbarAlgorithm } from './siderbar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Pomeluce Docs',
  description: 'Pomeluce 文档库',
  head: [
    ['link', { rel: 'icon', href: '/docs/pomeluce.ico' }],
    ['link', { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css', crossorigin: '' }],
  ],
  base: '/docs/',
  lang: 'zh-CN',
  lastUpdated: true,
  markdown: {
    theme: 'one-dark-pro',
    config: md => {
      md.use(markdownItKatex);
    },
  },
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
            link: '/develop/java/javabase/java001',
            activeMatch: '/develop/java/',
          },
          {
            text: 'Ts + Vue',
            link: '/develop/web/javascript/js001',
            activeMatch: '/develop/web/',
          },
          {
            text: 'Linux 系统',
            link: '/develop/linux/syserver/syserver001',
            activeMatch: '/develop/linux/',
          },
          {
            text: '数据库',
            link: '/develop/database/psql/psql001',
            activeMatch: '/develop/database/',
          },
        ],
      },
      {
        text: 'Bug 合集',
        link: '/bugs/bug001',
        activeMatch: '/bugs/',
      },
      {
        text: '算法合集',
        link: '/algorithm/topic/topic001',
        activeMatch: '/algorithm/',
      },
    ],

    sidebar: {
      '/develop/java/': siderbarJava(),
      '/develop/web/': siderbarWeb(),
      '/develop/linux/': siderbarLinux(),
      '/develop/database/': siderbarDatabase(),
      '/bugs/': siderbarBug(),
      '/algorithm/': siderbarAlgorithm(),
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/pomeluce/pomeluce-docs' }],
    editLink: {
      pattern: 'https://github.com/pomeluce/pomeluce-docs/edit/main/docs/:path',
      text: '在 Github 上编辑此页',
    },
  },
});

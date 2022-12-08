// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Ahmed BARGADY",
  tagline: "Documentation for ML, DL and Data Science Projects",
  url: "https://ahmedbargady.me",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "AhmedCoolProjects", // Usually your GitHub org/user name.
  projectName: "AhmedBargadyBlog", // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en"],
  // },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          remarkPlugins: [math],
          rehypePlugins: [katex],
          sidebarPath: require.resolve("./sidebars.js"),
          lastVersion: "current",
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        blog: {
          showReadingTime: true,
        },
        sitemap: {
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      /** @type {import('@docusaurus/plugin-content-docs').Options} */

      {
        id: "docs-books",
        path: "docs-books",
        routeBasePath: "docs-books",
        sidebarPath: require.resolve("./sidebars.js"),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      prism: {
        additionalLanguages: ["solidity"],
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      algolia: {
        apiKey: "d989d6abba9c91416ffa987ca1386707",
        appId: "PGDP54NBCE",
        indexName: "prod_index",
      },
      navbar: {
        title: "JINA Blog",
        logo: {
          alt: "My Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Machine Learning",
          },
          {
            to: "/docs-books/welcome",
            docId: "welcome",
            position: "left",
            label: "Deep Learning",
          },
          {
            position: "left",
            label: "Data Science",
            href: "https://data.ahmedbargady.me",
          },
          {
            type: "search",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Projects",
            items: [
              {
                label: "Machine Learning",
                to: "/docs/category/projects",
              },
              {
                label: "Deep Learning",
                to: "/docs-books/category/projects",
              },
              {
                label: "Data Science",
                href: "https://data.ahmedbargady.me",
              },
            ],
          },

          {
            title: "Check More",
            items: [
              {
                label: "My Portfolio",
                href: "https://ahmedbargady.me",
              },
              {
                label: "JINA AI",
                href: "https://ai.ahmedbargady.me",
              },
              {
                label: "JINA DATA",
                href: "https://data.ahmedbargady.me",
              },
              {
                label: "JINA WEB",
                href: "https://web.ahmedbargady.me",
              },
              {
                label: "JINA APIs",
                href: "https://apis.ahmedbargady.me",
              },
            ],
          },
          {
            title: "Contact Me",
            items: [
              {
                label: "Email",
                href: "mailto:ahmed.bargady@outlook.com",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/ahmed-bargady/",
              },
              {
                label: "GitHub",
                href: "https://github.com/AhmedCoolProjects",
              },
              {
                label: "Skype",
                href: "https://join.skype.com/invite/KhGQ8bQAWSug",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} JINA Pro, Inc.`,
      },
    }),
};

module.exports = config;

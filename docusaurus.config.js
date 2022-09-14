// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Ahmed BARGADY",
  tagline: "Blog portfolio for my Data Science & Machine Learning Projects",
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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          lastVersion: "current",
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        // },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
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
      navbar: {
        title: "",
        logo: {
          alt: "My Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Projects",
          },
          {
            to: "/docs-books/welcome",
            docId: "welcome",
            position: "left",
            label: "Books",
          },

          // { to: "/blog", label: "Blog", position: "left" },
          // {
          //   href: "https://github.com/facebook/docusaurus",
          //   label: "GitHub",
          //   position: "right",
          // },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Projects",
            items: [
              {
                label: "Machine Learning",
                to: "/docs/category/machine-learning",
              },
              {
                label: "Computer Vision",
                to: "/docs/category/computer-vision",
              },
              {
                label: "Deep Learning",
                to: "/docs/category/deep-learning",
              },
              {
                label: "Speech Recognition",
                to: "/docs/category/speech-recognition",
              },
              {
                label: "Web Development",
                href: "https://www.ahmedbargady.me/projects#web-development",
              },
            ],
          },
          // {
          //   title: "Community",
          //   items: [
          //     {
          //       label: "Stack Overflow",
          //       href: "https://stackoverflow.com/questions/tagged/docusaurus",
          //     },
          //     {
          //       label: "Discord",
          //       href: "https://discordapp.com/invite/docusaurus",
          //     },
          //     {
          //       label: "Twitter",
          //       href: "https://twitter.com/docusaurus",
          //     },
          //   ],
          // },
          // {
          //   label: "Blog",
          //   to: "/blog",
          // },
          {
            title: "Check for more",
            items: [
              {
                label: "My Portfolio",
                href: "https://ahmedbargady.me",
              },
              {
                label: "My GitHub",
                href: "https://github.com/AhmedCoolProjects",
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
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ahmed Bargady Blog, by: Ahmed Bargady.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

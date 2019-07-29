const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const defaultConfig = require('tailwindcss/defaultConfig');
const containerSizesPlugin = require('./index.js');

const generatePluginCss = (config, pluginOptions = {}) => {
  return postcss(
    tailwindcss(
      _.merge({
        theme: {
          screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
          },
        },
        corePlugins: (function() {
          let disabledCorePlugins = {};
          Object.keys(defaultConfig.variants).forEach(corePlugin => {
            disabledCorePlugins[corePlugin] = false;
          });
          return disabledCorePlugins;
        })(),
        plugins: [
          containerSizesPlugin(pluginOptions),
        ],
      }, config)
    )
  )
  .process('@tailwind utilities;', {
    from: undefined,
  })
  .then(result => {
    return result.css;
  });
};

expect.extend({
  toMatchCss: cssMatcher,
});

test('the plugin creates container sizes based on breakpoints by default', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`
      .container-sm {
        max-width: 640px;
        width: 100%;
      }

      .container-md {
        max-width: 768px;
        width: 100%;
      }

      .container-lg {
        max-width: 1024px;
        width: 100%;
      }

      .container-xl {
        max-width: 1280px;
        width: 100%;
      }
    `);
  });
});

test('the plugin uses the built-in containers config and variants', () => {
  return generatePluginCss({
    theme: {
      container: {
        center: true,
        padding: '1.5rem',
      },
    },
    variants: {
      container: ['responsive'],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .container-sm {
        max-width: 640px;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        padding-right: 1.5rem;
        padding-left: 1.5rem
      }

      .container-md {
        max-width: 768px;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        padding-right: 1.5rem;
        padding-left: 1.5rem
      }

      .container-lg {
        max-width: 1024px;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        padding-right: 1.5rem;
        padding-left: 1.5rem
      }

      .container-xl {
        max-width: 1280px;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        padding-right: 1.5rem;
        padding-left: 1.5rem
      }

      @media (min-width: 640px) {
        .sm\\:container-sm {
          max-width: 640px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }

        .sm\\:container-md {
          max-width: 768px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }

        .sm\\:container-lg {
          max-width: 1024px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }

        .sm\\:container-xl {
          max-width: 1280px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }
      }

      @media (min-width: 768px) {
        .md\\:container-sm {
          max-width: 640px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }

        .md\\:container-md {
          max-width: 768px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }

        .md\\:container-lg {
          max-width: 1024px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }

        .md\\:container-xl {
          max-width: 1280px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }
      }

      @media (min-width: 1024px) {
        .lg\\:container-sm {
          max-width: 640px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }

        .lg\\:container-md {
          max-width: 768px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }

        .lg\\:container-lg {
          max-width: 1024px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }

        .lg\\:container-xl {
          max-width: 1280px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }
      }

      @media (min-width: 1280px) {
        .xl\\:container-sm {
          max-width: 640px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }

        .xl\\:container-md {
          max-width: 768px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }

        .xl\\:container-lg {
          max-width: 1024px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }

        .xl\\:container-xl {
          max-width: 1280px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }
      }
    `);
  });
});

test('the plugin allows custom container sizes with theme.container.size', () => {
  return generatePluginCss({
    theme: {
      container: {
        center: true,
        padding: '1.5rem',
        size: {
          xs: '480px'
        }
      },
    },
    variants: {
      container: ['responsive'],
    },
  }).then(css => {
    expect(css).toMatchCss(`
      .container-xs {
        max-width: 480px;
        width: 100%;
        margin-right: auto;
        margin-left: auto;
        padding-right: 1.5rem;
        padding-left: 1.5rem
      }

      @media (min-width: 640px) {
        .sm\\:container-xs {
          max-width: 480px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }
      }

      @media (min-width: 768px) {
        .md\\:container-xs {
          max-width: 480px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }
      }

      @media (min-width: 1024px) {
        .lg\\:container-xs {
          max-width: 480px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }
      }

      @media (min-width: 1280px) {
        .xl\\:container-xs {
          max-width: 480px;
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1.5rem;
          padding-left: 1.5rem
        }
      }
    `);
  });
});

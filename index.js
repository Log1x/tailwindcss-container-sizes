const _ = require('lodash');

module.exports = function() {
  return ({ addUtilities, theme, config }) => {
    const screens = theme('container.size', theme('screens'));

    _.each(screens, (value, key) => {
      addUtilities({
        [`.container-${key}`]: Object.assign(
          { maxWidth: value, width: '100%' },
          theme('container.center', false) ? { marginRight: 'auto', marginLeft: 'auto' } : {},
          _.has(theme('container', {}), 'padding')
            ? {
              paddingRight: theme('container.padding'),
              paddingLeft: theme('container.padding'),
            }
            : {}
        ),
      }, config('variants.container', []));
    });
  };
};

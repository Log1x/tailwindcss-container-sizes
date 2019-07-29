# TailwindCSS Container Sizes Plugin

![Package Version](https://img.shields.io/npm/v/tailwindcss-container-sizes?style=flat-square)
![Package Total Downloads](https://img.shields.io/npm/dt/tailwindcss-container-sizes?style=flat-square)

## Requirements

- [Tailwind CSS](https://tailwindcss.com/) >= v1.0.0

## Installation

Install via Yarn:

```sh
$ yarn add tailwindcss-container-sizes
```

## Usage

```js
// tailwind.config.js
{
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    container: {
      center: true,
      padding: '1.5rem',
      sizes: {}, // defaults to breakpoint (screens) sizes
    },
  },
  plugins: [
    require('tailwindcss-container-sizes')(),
  ],
}
```

This plugin generates the following utilities:

```css
.container-sm {
  max-width: 640px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1.5rem;
  padding-left: 1.5rem
}

.container-md {
  max-width: 768px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1.5rem;
  padding-left: 1.5rem
}

.container-lg {
  max-width: 1024px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1.5rem;
  padding-left: 1.5rem
}

.container-xl {
  max-width: 1280px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 1.5rem;
  padding-left: 1.5rem
}
```

## Testing

Tests are handled with [Jest](https://github.com/facebook/jest) and can be ran using:

```sh
$ yarn run test
```

## Bug Reports

If you discover a bug in TailwindCSS Container Sizes, please [open an issue](https://github.com/log1x/tailwindcss-container-sizes/issues).

## Contributing

Contributing whether it be through PRs, reporting an issue, or suggesting an idea is encouraged and appreciated.

## License

TailwindCSS Container Sizes provided under the [MIT License](https://github.com/log1x/tailwindcss-container-sizes/blob/master/LICENSE.md).

# Container Sizes for Tailwind CSS

## Installation

```sh
yarn add tailwindcss-container-sizes
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

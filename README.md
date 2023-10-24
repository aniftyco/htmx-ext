# htmx-ext

> Collection of useful htmx extensions

## Getting Started

### Installation

#### Via CDN (e.g. unpkg.com)

The fastest way to get going is by loading each extension you want to use into your head tag like so:

```html
<script src="https://unpkg.com/htmx-ext/dist/body-support.js"></script>
```

#### Via npm

For npm-style build systems, you can install htmx-ext via npm:

```sh
npm install -D htmx-ext
```

### Included Extensions

| Extension    | Description                                                                                                                                         |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| body-support | When using `hx-boost` on the `<body>` tag it doesn't update the body attributes. `body-support` does.                                               |
| csrf-token   | This configures the `x-csrf-token` header in requests based on the `<meta name="csrf-token" />` contents                                            |
| boost-errors | This allows boosted pages to return `500`, `400`, `401`, `403` and `404` errors instead of just console logging your error and stopping from there. |

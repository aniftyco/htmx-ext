htmx.defineExtension('csrf-token', {
  onEvent(name, event) {
    if (name === 'htmx:configRequest') {
      event.detail.headers['x-csrf-token'] = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    }
  },
});

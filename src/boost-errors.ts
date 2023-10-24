htmx.defineExtension('boost-errors', {
  onEvent(name, event) {
    if (name === 'htmx:beforeOnLoad' && [500, 400, 401, 403, 404].includes(event.detail.xhr.status)) {
      event.stopPropagation();

      // We're in a renderable error state, so we can just replace the body
      document.children[0].innerHTML = event.detail.xhr.response;

      // Run any inline scripts
      document.querySelectorAll('script').forEach((script) => {
        // @ts-ignore
        (1, eval)(script.innerText);
      });
    }
  },
});

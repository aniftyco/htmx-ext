type BodyAttribute = {
  name: string;
  value: string;
};

const parser = new DOMParser();

htmx.defineExtension('body-support', {
  onEvent(name, event) {
    if (name === 'htmx:afterSwap') {
      const parsedResponse = parser.parseFromString(event.detail.xhr.response, 'text/html');
      const bodyAttributes = parsedResponse.body.attributes as unknown as BodyAttribute[];

      for (const attribute of bodyAttributes) {
        event.detail.target.setAttribute(attribute.name, attribute.value);
      }
    }
  },
});

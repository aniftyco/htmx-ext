type BodyAttribute = {
  name: string;
  value: string;
};

htmx.defineExtension('body-support', {
  onEvent(name, event) {
    if (name === 'htmx:afterSwap') {
      const parser = new DOMParser();
      const parsedResponse = parser.parseFromString(event.detail.xhr.response, 'text/html');
      const bodyAttributes = parsedResponse.body.attributes as unknown as BodyAttribute[];

      // remove all attributes
      while (event.detail.target.attributes.length > 0) {
        event.detail.target.removeAttribute(event.detail.target.attributes[0].name);
      }

      // reset attributes based on response attributes
      for (const attribute of bodyAttributes) {
        event.detail.target.setAttribute(attribute.name, attribute.value);
      }
    }
  },
});

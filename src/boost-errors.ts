const handleErrorFlag = (event: any) => {
  if (event.detail.isError) {
    if ((htmx.config as any).responseTargetUnsetsError) {
      event.detail.isError = false;
    }
  } else if ((htmx.config as any).responseTargetSetsError) {
    event.detail.isError = true;
  }
};

htmx.defineExtension('boost-errors', {
  // @ts-ignore - htmx is not typed for this method
  init() {
    if ((htmx.config as any).responseTargetUnsetsError === undefined) {
      (htmx.config as any).responseTargetUnsetsError = true;
    }

    if ((htmx.config as any).responseTargetSetsError === undefined) {
      (htmx.config as any).responseTargetSetsError = false;
    }

    if ((htmx.config as any).responseTargetPrefersExisting === undefined) {
      (htmx.config as any).responseTargetPrefersExisting = false;
    }

    if ((htmx.config as any).responseTargetPrefersRetargetHeader === undefined) {
      (htmx.config as any).responseTargetPrefersRetargetHeader = true;
    }
  },
  onEvent(name, event) {
    if (name === 'htmx:beforeSwap' && event.detail.xhr && event.detail.xhr.status !== 200) {
      if (event.detail.target) {
        if ((htmx.config as any).responseTargetPrefersExisting) {
          event.detail.shouldSwap = true;
          handleErrorFlag(event);
          return true;
        }
        if (
          (htmx.config as any).responseTargetPrefersRetargetHeader &&
          event.detail.xhr.getAllResponseHeaders().match(/HX-Retarget:/i)
        ) {
          event.detail.shouldSwap = true;
          handleErrorFlag(event);
          return true;
        }
      }
      if (!event.detail.requestConfig) {
        return true;
      }

      handleErrorFlag(event);
      event.detail.shouldSwap = true;
      event.detail.target = document.body;
    }
  },
});

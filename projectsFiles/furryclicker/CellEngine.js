function resolveAfter2Seconds(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      }, ms);
    });
  }
  const settings = document.createElement('script');
  const classes = document.createElement('script');
  const script = document.createElement('script');
  settings.type = 'text/javascript';
  settings.src = 'settings.js';
  classes.type = 'text/javascript';
  classes.src = 'classes.js';
  script.type = 'text/javascript';
  script.src = 'script.js';
  async function importing() {
    document.head.appendChild(settings);
  await resolveAfter2Seconds(200);
  document.head.appendChild(classes);
  await resolveAfter2Seconds(200);
  document.head.appendChild(script);
  }
  importing();
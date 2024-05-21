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
const server = document.createElement('script');
settings.type = 'text/javascript';
settings.src = 'settings.js';
classes.type = 'text/javascript';
classes.src = 'classes.js';
script.type = 'text/javascript';
script.src = 'script.js';
server.type = 'text/javascript';
server.src = 'onlineManager.js';
async function importing() {
  document.head.appendChild(settings);
console.log("importing settings");
await resolveAfter2Seconds(200);
document.head.appendChild(classes);
console.log("importing classes");
await resolveAfter2Seconds(200);
document.head.appendChild(script);
console.log("importing scripts");
await resolveAfter2Seconds(200);
//document.head.appendChild(server);
}
importing();


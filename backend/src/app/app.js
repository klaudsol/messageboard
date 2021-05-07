//Defaults should favor development environment

import "@babel/polyfill";
import "cross-fetch/polyfill";
import Koa from "koa";
import Router from "koa-router";
import proxy from "koa-proxy";
import mount from "koa-mount";
import serverless from "serverless-http";
import bodyParser from "koa-bodyparser";


const backend = new Koa();
const frontend = new Koa();
const app = new Koa();
const router = new Router();
const backendPath = "/.netlify/functions/index";
const frontendPort = 8081;
const port = 8080;

router.get("/message", async (ctx) => {
});

router.post("/message", bodyParser(),  async (ctx) => {
});

backend.use(router.allowedMethods());
backend.use(router.routes());
app.use(mount(backendPath, backend));

if (!process.env.REACT_APP_SERVERLESS) {
  frontend.use(
    proxy({
      host: `http://localhost:${frontendPort}`,
    })
  );
  app.use(mount("/", frontend));
  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}


const handler = serverless(app);

//required by Netlify
export default { handler };
export { handler };

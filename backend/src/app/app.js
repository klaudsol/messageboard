//Defaults should favor development environment

import "dotenv/config";
import "@babel/polyfill";
import "cross-fetch/polyfill";
import Koa from "koa";
import Router from "koa-router";
import proxy from "koa-proxy";
import mount from "koa-mount";
import serverless from "serverless-http";
import bodyParser from "koa-bodyparser";
import Redis from "ioredis"
  


const backend = new Koa();
const frontend = new Koa();
const app = new Koa();
const router = new Router();
const backendPath = "/.netlify/functions/index";
const frontendPort = 8081;
const port = 8080;

router.get("/message", async (ctx) => {
  const client = new Redis(process.env.REDIS_URL);
  try {
    const messages = await client.lrange('messageboard', 0, -1);
    console.error(messages);
    ctx.body = messages.map((message) => {
      const {name, message: _message} = JSON.parse(message);
      return [name, _message];
    });
  } finally {
    if (client) client.quit();  
  }
  
});

router.post("/message", bodyParser(),  async (ctx) => {
  const client = new Redis(process.env.REDIS_URL);
  try {
    console.error(process.env.REDIS_URL);
    console.error(ctx.request.body);
    await client.lpush('messageboard', JSON.stringify(ctx.request.body));
    const messages = await client.lrange('messageboard', 0, -1);
    ctx.body = messages.map((message) => {
      const {name, message: _message} = JSON.parse(message);
      return [name, _message];
    });
    console.error(ctx.body);
  } finally {
    if (client) client.quit();  
  }
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

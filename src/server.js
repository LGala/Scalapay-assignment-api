import Fastify from "fastify";
import fastifySwagger from "fastify-swagger";
import fastifyCors from "fastify-cors";

import { swaggerConfig } from "./swaggerConfig.js";
import { corsConfig } from "./corsConfig.js";
import { createOrdersRoute } from "../src/routes/orders/post.js";
import { getInfoRoute } from "../src/routes/info/get.js";

export const getApp = () => {
  const app = Fastify({
    logger: true
  });

  app.register(fastifySwagger, swaggerConfig);
  app.register(fastifyCors, corsConfig);

  app.route(getInfoRoute);
  app.route(createOrdersRoute);

  return app;
};

const start = async app => {
  try {
    await app.listen(8080);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start(getApp());

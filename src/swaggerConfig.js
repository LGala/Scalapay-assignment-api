export const swaggerConfig = {
  routePrefix: "/documentation",
  swagger: {
    info: {
      title: "API developer task documentation"
    },
    host: "localhost:8080",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
      apiKey: {
        type: "apiKey",
        name: "apiKey",
        in: "header"
      }
    }
  },
  uiConfig: {
    docExpansion: "full",
    deepLinking: false
  },
  staticCSP: true,
  transformStaticCSP: header => header,
  exposeRoute: true
};

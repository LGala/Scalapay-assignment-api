import { getInfoHandler } from "../../handlers/info/index.js";

export const getInfoRoute = {
  method: "GET",
  url: "/info",
  schema: {
    description: "info endpoint",
    tags: ["info"],
    response: {
      200: {
        type: "object",
        properties: {
          info: { type: "string" }
        }
      }
    }
  },
  handler: getInfoHandler
};

import { createOrderService } from "../../services/standard-capture/v2/orders/post.js";

export const createOrderHandler = async (req, reply) => {
  if (!req.body.items.every(({ gtin }) => ["UPC", "EAN", "JAN", "ISBN", "ITF-14"].includes(gtin))) {
    reply.code(400).send({
      statusCode: 400,
      error: "Bad Request",
      message: "gtin shuold be included in UPC, EAN, JAN, ISBN, ITF-14"
    });
  }

  if (req.body.totalAmount.amount <= 0 || req.body.totalAmount.amount > 1000) {
    reply.code(400).send({ statusCode: 400, error: "Bad Request", message: "0 < amount <= 1000" });
  }

  if (req.body?.billing?.countryCode?.length === 1 || req.body?.billing?.countryCode?.length > 2) {
    reply
      .code(400)
      .send({ statusCode: 400, error: "Bad Request", message: "countryCode should be 0 or 2 letters long" });
  }

  if (req.body.consumer.email.length > 0) {
    if (
      !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.consumer.email) && req.body.consumer.email.split(".").length === 2)
    ) {
      reply.code(400).send({ statusCode: 400, error: "Bad Request", message: "you didn't supplied a correct mail" });
    }
  }

  return await createOrderService(req.body);
};

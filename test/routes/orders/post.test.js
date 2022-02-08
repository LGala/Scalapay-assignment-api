import tap from "tap";
import Fastify from "fastify";
import { createOrdersRoute } from "../../../src/routes/orders/post.js";

const payloadWithOnlyRequiredAttributes = {
  totalAmount: {
    amount: "200",
    currency: "EUR"
  },
  consumer: {
    phoneNumber: "3665336171",
    givenNames: "Lorenzo",
    surname: "Galafassi",
    email: "a@a.com"
  },
  shipping: {
    phoneNumber: "3665336171",
    countryCode: "ss",
    name: "Lorenzo Galafassi",
    postCode: "23100",
    suburb: "Berbenno di valtellina",
    line1: "111"
  },
  items: [
    {
      gtin: "UPC",
      price: {
        amount: "100",
        currency: "EUR"
      },
      name: "Air Max Deluxe",
      category: "Sport",
      subcategory: ["Shoes"],
      sku: "1",
      brand: "Nike",
      quantity: 2
    }
  ],
  merchant: {
    redirectConfirmUrl: "https://portal.staging.scalapay.com/success-url",
    redirectCancelUrl: "https://portal.staging.scalapay.com/failure-url"
  }
};

const payloadWithNonRequiredAttributes = {
  billing: {
    phoneNumber: "3665336171",
    countryCode: "IT",
    name: "Lorenzo Galafassi",
    postCode: "23100",
    suburb: "Berbenno di valtellina",
    line1: "11"
  },
  discounts: [],
  merchantReference: "102322",
  shippingAmount: {
    amount: "100",
    currency: "EUR"
  },
  taxAmount: {
    amount: "100",
    currency: "EUR"
  },
  orderExpiryMilliseconds: 60000
};

const getApp = () => {
  const fastify = Fastify();

  fastify.route(createOrdersRoute);

  return fastify;
};

const successfulResponseObjectAttributes = ["token", "expires", "checkoutUrl"];

const getCallConfig = payload => ({
  method: "POST",
  url: "/orders",
  payload: payload
});

const getBodyAttributes = response => Object.keys(JSON.parse(response.body));

tap.test("when POST /orders payload contains only the required fields, the call should be successful", async assert => {
  const app = getApp();

  const response = await app.inject(getCallConfig(payloadWithOnlyRequiredAttributes));

  assert.strictSame(getBodyAttributes(response), successfulResponseObjectAttributes);
});

tap.test(
  "when POST /orders payload not contains all the required fields, the call shouldn't be successful",
  async assert => {
    const app = getApp();

    const { consumer, ...payloadWithoutAllRequiredAttributes } = payloadWithOnlyRequiredAttributes;

    const response = await app.inject({
      method: "POST",
      url: "/orders",
      payload: payloadWithoutAllRequiredAttributes
    });

    assert.strictSame(response.statusCode, 400);
  }
);

tap.test(
  "when POST /orders payload contains the required fields and other non-required fields, the call should be successful",
  async assert => {
    const app = getApp();

    const response = await app.inject(
      getCallConfig({ ...payloadWithNonRequiredAttributes, ...payloadWithOnlyRequiredAttributes })
    );

    assert.strictSame(getBodyAttributes(response), successfulResponseObjectAttributes);
  }
);

tap.test("when POST /orders payload contains a bad shipping object, the call shouldn't be successful", async assert => {
  const app = getApp();

  const { name, ...shippingWithoutName } = payloadWithOnlyRequiredAttributes.shipping;

  const response = await app.inject(getCallConfig(shippingWithoutName));

  assert.strictSame(response.statusCode, 400);
});

tap.test(
  "when POST /orders payload contains a bad totalAmount object, the call shouldn't be successful",
  async assert => {
    const app = getApp();

    const { currency, ...totalAmountWithoutCurrency } = payloadWithOnlyRequiredAttributes.totalAmount;

    const response = await app.inject(getCallConfig(totalAmountWithoutCurrency));

    assert.strictSame(response.statusCode, 400);
  }
);

tap.test(
  "when POST /orders payload contains a shipping Object with a bad country code, the call shouldn't be successful",
  async assert => {
    const app = getApp();

    payloadWithOnlyRequiredAttributes.shipping.countryCode = "more that 2 letter long";

    const response = await app.inject(getCallConfig(payloadWithOnlyRequiredAttributes));

    assert.strictSame(response.statusCode, 400);
  }
);

tap.test(
  "when POST /orders payload contains a totalAmount Object with an incorrect amount, the call shouldn't be successful",
  async assert => {
    const app = getApp();

    payloadWithOnlyRequiredAttributes.totalAmount.amount = "10000";

    const response = await app.inject(getCallConfig(payloadWithOnlyRequiredAttributes));

    assert.strictSame(response.statusCode, 400);
  }
);

tap.test(
  "when POST /orders payload contains an items array with an Object with a bad gtin, the call shouldn't be successful",
  async assert => {
    const app = getApp();

    payloadWithOnlyRequiredAttributes.items[0].gtin = "foo";

    const response = await app.inject(getCallConfig(payloadWithOnlyRequiredAttributes));

    assert.strictSame(response.statusCode, 400);
  }
);

tap.test(
  "when POST /orders payload contains a consumer Object with a bad email, the call shouldn't be successful",
  async assert => {
    const app = getApp();

    payloadWithOnlyRequiredAttributes.consumer.email = "foo";

    const response = await app.inject(getCallConfig(payloadWithOnlyRequiredAttributes));

    assert.strictSame(response.statusCode, 400);
  }
);

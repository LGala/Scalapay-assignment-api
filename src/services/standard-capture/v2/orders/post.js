import fetch from "node-fetch";

import { API_KEY } from "../../../../../env.js";

export const createOrderService = async orderData => {
  const url = "https://staging.api.scalapay.com/v2/orders";

  const body = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: API_KEY
    },
    body: JSON.stringify(orderData)
  };

  try {
    const response = await fetch(url, body);
    const responseBody = await response.json();

    if ([responseBody?.httpStatusCode, responseBody.message?.status].some(msg => msg === 400)) {
      throw {
        statusCode: 400,
        error: "Bad Request",
        message: responseBody.message?.errors?.[0].messages || responseBody.message
      };
    }

    return responseBody;
  } catch (error) {
    throw error;
  }
};

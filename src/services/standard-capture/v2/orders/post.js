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

    console.log(responseBody);

    return responseBody;
  } catch (error) {
    throw error;
  }
};

import { createOrderHandler } from "../../handlers/orders/index.js";

export const createOrdersRoute = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  url: "/orders",
  schema: {
    description: "endpoint used to create orders",
    tags: ["info"],
    body: {
      type: "object",
      properties: {
        totalAmount: {
          type: "object",
          properties: {
            amount: {
              type: "string"
            },
            currency: {
              type: "string"
            }
          },
          required: ["amount", "currency"]
        },
        consumer: {
          type: "object",
          properties: {
            phoneNumber: {
              type: "string"
            },
            givenNames: {
              type: "string"
            },
            surname: {
              type: "string"
            },
            email: {
              type: "string"
            }
          },
          required: ["givenNames", "surname"]
        },
        billing: {
          type: "object",
          properties: {
            phoneNumber: {
              type: "string"
            },
            countryCode: {
              type: "string"
            },
            name: {
              type: "string"
            },
            postCode: {
              type: "string"
            },
            suburb: {
              type: "string"
            },
            line1: {
              type: "string"
            }
          }
        },
        shipping: {
          type: "object",
          properties: {
            phoneNumber: {
              type: "string"
            },
            countryCode: {
              type: "string",
              maxLength: 2,
              minLength: 2
            },
            name: {
              type: "string"
            },
            postCode: {
              type: "string"
            },
            suburb: {
              type: "string"
            },
            line1: {
              type: "string"
            }
          },
          required: ["countryCode", "name", "postCode", "line1"]
        },
        items: {
          type: "array",
          items: {
            type: "object",
            properties: {
              gtin: {
                type: "string"
              },
              price: {
                type: "object",
                properties: {
                  amount: {
                    type: "string"
                  },
                  currency: {
                    type: "string"
                  }
                },
                required: ["amount", "currency"]
              },
              name: {
                type: "string"
              },
              category: {
                type: "string"
              },
              subcategory: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              sku: {
                type: "string"
              },
              brand: {
                type: "string"
              },
              quantity: {
                type: "integer"
              }
            },
            required: ["price", "name", "category", "sku", "quantity"]
          }
        },
        discounts: {
          type: "array",
          items: {
            type: "object",
            properties: {
              amount: {
                type: "object",
                properties: {
                  amount: {
                    type: "string"
                  },
                  currency: {
                    type: "string"
                  }
                },
                required: ["amount", "currency"]
              },
              displayName: {
                type: "string"
              }
            }
          }
        },
        merchant: {
          type: "object",
          properties: {
            redirectConfirmUrl: {
              type: "string"
            },
            redirectCancelUrl: {
              type: "string"
            }
          },
          required: ["redirectConfirmUrl", "redirectCancelUrl"]
        },
        merchantReference: {
          type: "string"
        },
        shippingAmount: {
          type: "object",
          properties: {
            amount: {
              type: "string"
            },
            currency: {
              type: "string"
            }
          }
        },
        taxAmount: {
          type: "object",
          properties: {
            amount: {
              type: "string"
            },
            currency: {
              type: "string"
            }
          }
        },
        orderExpiryMilliseconds: {
          type: "integer"
        }
      },
      required: ["totalAmount", "consumer", "shipping", "items", "merchant"]
    },
    response: {
      200: {
        type: "object",
        description: "return an expirable token in order to let the user connects to a checkout url",
        properties: {
          token: { type: "string" },
          expires: { type: "string" },
          checkoutUrl: { type: "string" }
        }
      },
      400: {
        type: "object",
        description: "some required property are missing or some paramaters aren't correct",
        properties: {
          statusCode: { type: "integer" },
          error: { type: "string" },
          message: { type: "string" }
        }
      }
    }
  },
  handler: createOrderHandler
};

import { z } from "zod";

const setupPayment = z.object({
  body: z.object({
    orderId: z.string({
      required_error: "Order Id is required",
    }),
  }),
});

export const PaymentValidationSchemas = {
  setupPayment,
};

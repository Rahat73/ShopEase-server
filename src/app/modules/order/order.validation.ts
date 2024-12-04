import { z } from "zod";

const createOrder = z.object({
  body: z.object({
    discount: z.number().optional(),
    orderItems: z.array(
      z.object({
        productId: z.string({
          required_error: "Product Id is required",
        }),
        quantity: z.number({
          required_error: "Quantity is required",
        }),
      })
    ),
  }),
});

export const OrderValidationSchemas = {
  createOrder,
};

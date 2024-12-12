import { z } from "zod";

const createOrder = z.object({
  body: z.object({
    discount: z.number().optional(),
    phone: z.string({
      required_error: "Contact Number is required!",
    }),
    address: z.string({
      required_error: "Address is required!",
    }),
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

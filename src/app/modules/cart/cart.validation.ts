import { z } from "zod";

const addToCart = z.object({
  body: z.object({
    productId: z.string({
      required_error: "Product Id is required",
    }),
    quantity: z.number({
      required_error: "Quantity is required",
    }),
  }),
});

const updateCartItemQuantity = z.object({
  body: z.object({
    quantity: z.number({
      required_error: "Quantity is required",
    }),
  }),
});

export const CartValidationSchemas = {
  addToCart,
  updateCartItemQuantity,
};

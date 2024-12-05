import { z } from "zod";

const addRecentProduct = z.object({
  body: z.object({
    productId: z.string({
      required_error: "Product Id is required",
    }),
  }),
});

export const RecentProductValidationSchemas = {
  addRecentProduct,
};

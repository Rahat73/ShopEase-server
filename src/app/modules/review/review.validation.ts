import { z } from "zod";

const addReview = z.object({
  body: z.object({
    productId: z.string({
      required_error: "Product Id is required",
    }),
    orderId: z.string({
      required_error: "Order Id is required",
    }),
    review: z.object({
      rating: z.number({
        required_error: "Rating is required",
      }),
      comment: z.string().optional(),
    }),
  }),
});

const addReply = z.object({
  body: z.object({
    reviewId: z.string({
      required_error: "Review Id is required",
    }),
    content: z.string({
      required_error: "Content is required",
    }),
  }),
});

export const ReviewValidationSchemas = {
  addReview,
  addReply,
};

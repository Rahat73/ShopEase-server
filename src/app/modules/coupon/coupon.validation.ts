import { z } from "zod";

const addCoupon = {
  body: z.object({
    code: z.string({
      required_error: "Coupon code is required",
    }),
    discount: z
      .number()
      .positive({ message: "Discount must be a positive number." })
      .max(100, { message: "Discount cannot exceed 100." }),
  }),
};

const updateCoupon = {
  body: z.object({
    code: z.string().optional(),
    discount: z
      .number()
      .positive({ message: "Discount must be a positive number." })
      .max(100, { message: "Discount cannot exceed 100." })
      .optional(),
  }),
};

export const CouponValidationSchemas = {
  addCoupon,
  updateCoupon,
};

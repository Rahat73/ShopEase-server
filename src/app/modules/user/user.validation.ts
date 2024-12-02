import { z } from "zod";

const createAdmin = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    admin: z.object({
      name: z.string({
        required_error: "Name is required!",
      }),
      email: z.string({
        required_error: "Email is required!",
      }),
      phone: z.string({
        required_error: "Contact Number is required!",
      }),
    }),
  }),
});

const createVendor = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    vendor: z.object({
      email: z.string({
        required_error: "Email is required!",
      }),
      phone: z.string({
        required_error: "Contact Number is required!",
      }),
      shopName: z.string({
        required_error: "Name is required!",
      }),
      shopDescription: z.string({
        required_error: "Description is required!",
      }),
      address: z.string({
        required_error: "Address is required!",
      }),
    }),
  }),
});

const createCustomer = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    customer: z.object({
      name: z.string({
        required_error: "Name is required!",
      }),
      email: z.string({
        required_error: "Email is required!",
      }),
      phone: z.string().optional(),
      address: z.string().optional(),
    }),
  }),
});

export const UserValidationSchemas = {
  createAdmin,
  createVendor,
  createCustomer,
};

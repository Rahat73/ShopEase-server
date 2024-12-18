import { z } from "zod";

const addProduct = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    description: z.string({
      required_error: "Description is required!",
    }),
    price: z
      .number({
        required_error: "Price is required!",
      })
      .positive({ message: "Price must be a positive number." }),
    discount: z
      .number()
      .positive({ message: "Price must be a positive number." })
      .optional(),
    inventoryCount: z
      .number({
        required_error: "Inventory Count is required!",
      })
      .int({ message: "Inventory count must be an integer." })
      .nonnegative({ message: "Inventory count cannot be negative." }),
    images: z.array(z.string()).optional(),
    categoryId: z.string({
      required_error: "Category Id is required!",
    }),
  }),
});

const updateProduct = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z
      .number()
      .positive({ message: "Price must be a positive number." })
      .optional(),
    discount: z
      .number()
      .positive({ message: "Price must be a positive number." })
      .optional(),
    inventoryCount: z
      .number()
      .int({ message: "Inventory count must be an integer." })
      .nonnegative({ message: "Inventory count cannot be negative." })
      .optional(),
    images: z.array(z.string()).optional(),
    categoryId: z.string().optional(),
  }),
});

export const ProductValidationSchemas = {
  addProduct,
  updateProduct,
};

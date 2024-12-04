import { Router } from "express";
import { CartControllers } from "./cart.controller";
import { Validator } from "../../middlewares/validate-request";
import { CartValidationSchemas } from "./cart.validation";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router.post(
  "/",
  auth(Role.CUSTOMER),
  Validator.validateRequest(CartValidationSchemas.addToCart),
  CartControllers.addToCart
);

export const CartRoutes = router;

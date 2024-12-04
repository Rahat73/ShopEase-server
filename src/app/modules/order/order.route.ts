import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { Validator } from "../../middlewares/validate-request";
import { OrderValidationSchemas } from "./order.validation";
import { OrderControllers } from "./order.controller";

const router = Router();

router.get(
  "/",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  OrderControllers.getAllOrders
);

router.get(
  "/my-orders",
  auth(Role.VENDOR, Role.CUSTOMER),
  OrderControllers.getMyOrders
);

router.post(
  "/",
  auth(Role.SUPER_ADMIN, Role.ADMIN, Role.CUSTOMER),
  Validator.validateRequest(OrderValidationSchemas.createOrder),
  OrderControllers.createOrder
);

export const OrderRoutes = router;

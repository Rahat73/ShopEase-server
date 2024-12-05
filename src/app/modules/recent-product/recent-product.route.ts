import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { RecentProductControllers } from "./recent-product.controller";
import { Validator } from "../../middlewares/validate-request";
import { RecentProductValidationSchemas } from "./recent-product.validation";

const router = Router();

router.get(
  "/",
  auth(Role.CUSTOMER),
  RecentProductControllers.getRecentProducts
);

router.post(
  "/",
  auth(Role.CUSTOMER),
  Validator.validateRequest(RecentProductValidationSchemas.addRecentProduct),
  RecentProductControllers.addRecentProduct
);

export const RecentProductRoutes = router;

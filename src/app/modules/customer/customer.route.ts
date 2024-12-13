import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { CustomerControllers } from "./customer.controller";

const router = Router();

router.get(
  "/",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  CustomerControllers.getAllCustomer
);

router.get(
  "/:vendorId",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  CustomerControllers.getCustomerById
);

export const CustomerRoutes = router;

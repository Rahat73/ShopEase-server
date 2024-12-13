import { Router } from "express";
import { VendorControllers } from "./vendor.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router.get("/", VendorControllers.getAllVendors);

router.get("/:vendorId", VendorControllers.getVendorById);

router.patch(
  "/:vendorId",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  VendorControllers.updateVendor
);

export const VendorRoutes = router;

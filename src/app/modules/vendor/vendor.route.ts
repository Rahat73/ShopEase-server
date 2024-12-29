import { Router } from "express";
import { VendorControllers } from "./vendor.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router.get(
  "/",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  VendorControllers.getAllVendors
);

router.get("/detailed-info", VendorControllers.getVendorsDetailedInfo);

router.get("/:vendorId", VendorControllers.getVendorById);

router.patch(
  "/:vendorId",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  VendorControllers.updateVendor
);

export const VendorRoutes = router;

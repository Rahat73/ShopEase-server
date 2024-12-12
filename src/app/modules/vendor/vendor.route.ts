import { Router } from "express";
import { VendorControllers } from "./vendor.controller";

const router = Router();

router.get("/", VendorControllers.getAllVendors);

router.get("/:vendorId", VendorControllers.getVendorById);

export const VendorRoutes = router;

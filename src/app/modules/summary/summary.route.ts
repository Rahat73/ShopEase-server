import { Router } from "express";
import { SummaryControllers } from "./summary.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router.get("/shopease", SummaryControllers.getShopEaseSummary);

router.get(
  "/product-sell-per-month",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  SummaryControllers.getProductSellPerMonth
);

router.get("/vendor", auth(Role.VENDOR), SummaryControllers.getVendorSummary);

router.get(
  "/vendor-product-sell-per-month",
  auth(Role.VENDOR),
  SummaryControllers.getProductSellPerMonthByVendor
);

export const SummaryRoutes = router;

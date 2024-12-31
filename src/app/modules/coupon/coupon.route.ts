import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { CouponControllers } from "./coupon.controller";

const router = Router();

router.get("/", CouponControllers.getAllCoupons);

router.post(
  "/",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  CouponControllers.addCoupon
);

router.patch(
  "/:couponId",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  CouponControllers.updateCoupon
);

router.delete(
  "/:couponId",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  CouponControllers.deleteCoupon
);

export const CouponRoutes = router;

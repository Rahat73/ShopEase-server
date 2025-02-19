import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProductRoutes } from "../modules/product/product.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { OrderRoutes } from "../modules/order/order.route";
import { CartRoutes } from "../modules/cart/cart.route";
import { FollowRoutes } from "../modules/follow/follow.route";
import { RecentProductRoutes } from "../modules/recent-product/recent-product.route";
import { VendorRoutes } from "../modules/vendor/vendor.route";
import { PaymentRoutes } from "../modules/payment/payment.route";
import { CustomerRoutes } from "../modules/customer/customer.route";
import { ReviewRoutes } from "../modules/review/review.route";
import { SummaryRoutes } from "../modules/summary/summary.route";
import { CouponRoutes } from "../modules/coupon/coupon.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/vendor",
    route: VendorRoutes,
  },
  {
    path: "/customer",
    route: CustomerRoutes,
  },
  {
    path: "/follow",
    route: FollowRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/cart",
    route: CartRoutes,
  },
  {
    path: "/recent-product",
    route: RecentProductRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  {
    path: "/payment",
    route: PaymentRoutes,
  },
  {
    path: "/review",
    route: ReviewRoutes,
  },
  {
    path: "/summary",
    route: SummaryRoutes,
  },
  {
    path: "/coupon",
    route: CouponRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

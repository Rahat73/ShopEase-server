import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ProductRoutes } from "../modules/product/product.route";
import { CategoryRoutes } from "../modules/category/category.route";
import { OrderRoutes } from "../modules/order/order.route";

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
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/product",
    route: ProductRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
  //   {
  //     path: "/admin",
  //     route: AdminRoutes,
  //   },
  //   {
  //     path: "/specialties",
  //     route: SpecialtiesRoutes,
  //   },
  //   {
  //     path: "/doctor",
  //     route: DoctorRoutes,
  //   },
  //   {
  //     path: "/patient",
  //     route: PatientRoutes,
  //   },
  //   {
  //     path: "/schedule",
  //     route: ScheduleRoutes,
  //   },
  //   {
  //     path: "/doctor-schedule",
  //     route: DoctorScheduleRoutes,
  //   },
  //   {
  //     path: "/appointment",
  //     route: AppointmentRoutes,
  //   },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

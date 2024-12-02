import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

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

import { Router } from "express";
import auth from "../../middlewares/auth";
import { AuthControllers } from "./auth.controller";
import { Role } from "@prisma/client";
import { Validator } from "../../middlewares/validate-request";
import { AuthValidationSchemas } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  Validator.validateRequest(AuthValidationSchemas.loginUser),
  AuthControllers.loginUser
);

// router.post("/refresh-token", AuthControllers.refreshToken);

router.patch(
  "/change-password",
  auth(Role.SUPER_ADMIN, Role.ADMIN, Role.VENDOR, Role.CUSTOMER),
  AuthControllers.changePassword
);

router.post("/forgot-password", AuthControllers.forgotPassword);

router.post("/reset-password", AuthControllers.resetPassword);

export const AuthRoutes = router;

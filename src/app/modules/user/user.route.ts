import { Role } from "@prisma/client";
import { Router } from "express";
import auth from "../../middlewares/auth";
import { fileUpload } from "../../config/multer.config";
import { Validator } from "../../middlewares/validate-request";
import { UserValidationSchemas } from "./user.validation";
import { UserControllers } from "./user.controller";

const router = Router();

router.post(
  "/create-admin",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  fileUpload.single("file"),
  Validator.validateRequestWithFiles(UserValidationSchemas.createAdmin),
  UserControllers.createAdmin
);

router.post(
  "/create-vendor",
  fileUpload.single("file"),
  Validator.validateRequestWithFiles(UserValidationSchemas.createVendor),
  UserControllers.createVendor
);

router.post(
  "/create-customer",
  fileUpload.single("file"),
  Validator.validateRequestWithFiles(UserValidationSchemas.createCustomer),
  UserControllers.createCustomer
);

router.patch(
  "/change-status/:id",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  UserControllers.changeStatus
);

export const UserRoutes = router;

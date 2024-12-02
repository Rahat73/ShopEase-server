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
  //   auth(Role.SUPER_ADMIN, Role.ADMIN),
  fileUpload.single("file"),
  Validator.validateRequestWithFiles(UserValidationSchemas.createAdmin),
  UserControllers.createAdmin
);

// router.post(
//   "/create-doctor",
//   auth(UserRole.SUPER_ADMIN, Role.ADMIN),
//   fileUploader.upload.single("profile_image"),
//   Validator.validateRequestWithFiles(UserValidationSchemas.createDoctor),
//   UserControllers.createDoctor
// );

// router.post(
//   "/create-patient",
//   fileUploader.upload.single("profile_image"),
//   Validator.validateRequestWithFiles(UserValidationSchemas.createPatient),
//   UserControllers.createPatient
// );

export const UserRoutes = router;

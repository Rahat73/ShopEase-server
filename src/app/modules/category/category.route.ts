import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { Validator } from "../../middlewares/validate-request";
import { fileUpload } from "../../config/multer.config";
import { CategoryControllers } from "./category.controller";
import { CategoryValidationSchemas } from "./category.validation";

const router = Router();

router.get("/", CategoryControllers.getAllCategories);

router.post(
  "/",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  fileUpload.single("file"),
  Validator.validateRequestWithFiles(CategoryValidationSchemas.addCategory),
  CategoryControllers.addCategory
);

router.patch(
  "/:categoryId",
  auth(Role.SUPER_ADMIN, Role.ADMIN),
  fileUpload.single("file"),
  Validator.validateRequestWithFiles(CategoryValidationSchemas.updateCategory),
  CategoryControllers.updateCategory
);

export const CategoryRoutes = router;

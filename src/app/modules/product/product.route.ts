import { Router } from "express";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { Validator } from "../../middlewares/validate-request";
import { ProductValidationSchemas } from "./product.validation";
import { fileUpload } from "../../config/multer.config";

const router = Router();

router.post(
  "/",
  auth(Role.SUPER_ADMIN, Role.ADMIN, Role.VENDOR),
  fileUpload.array("files"),
  Validator.validateRequestWithFiles(ProductValidationSchemas.addProduct),
  ProductControllers.addProduct
);

export const ProductRoutes = router;

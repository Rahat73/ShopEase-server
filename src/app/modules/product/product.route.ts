import { Router } from "express";
import { ProductControllers } from "./product.controller";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { Validator } from "../../middlewares/validate-request";
import { ProductValidationSchemas } from "./product.validation";
import { fileUpload } from "../../config/multer.config";

const router = Router();

router.get("/", ProductControllers.getAllProducts);

router.get(
  "/vendor-priority",
  auth(Role.CUSTOMER),
  ProductControllers.getAllProductsWithVendorPriority
);

router.get("/my-products", auth(Role.VENDOR), ProductControllers.getMyProducts);

router.get("/:productId", ProductControllers.getProductById);

router.post(
  "/",
  auth(Role.VENDOR),
  fileUpload.array("files"),
  Validator.validateRequestWithFiles(ProductValidationSchemas.addProduct),
  ProductControllers.addProduct
);

router.patch(
  "/:productId",
  auth(Role.VENDOR),
  fileUpload.array("files"),
  Validator.validateRequestWithFiles(ProductValidationSchemas.updateProduct),
  ProductControllers.updateProduct
);

router.delete(
  "/:productId",
  auth(Role.VENDOR),
  ProductControllers.deleteProduct
);

router.post(
  "/duplicate-product",
  auth(Role.VENDOR),
  ProductControllers.duplicateProduct
);

export const ProductRoutes = router;

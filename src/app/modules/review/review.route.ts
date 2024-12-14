import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { Validator } from "../../middlewares/validate-request";
import { ReviewValidationSchemas } from "./review.validation";
import { ReviewControllers } from "./review.controller";

const router = Router();

router.get("/", ReviewControllers.getProductReviews);

router.post(
  "/",
  auth(Role.CUSTOMER),
  Validator.validateRequest(ReviewValidationSchemas.addReview),
  ReviewControllers.addReview
);

router.post(
  "/add-reply",
  auth(Role.VENDOR),
  Validator.validateRequest(ReviewValidationSchemas.addReply),
  ReviewControllers.addReply
);

export const ReviewRoutes = router;

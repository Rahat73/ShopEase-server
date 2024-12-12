import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { PaymentControllers } from "./payment.controller";
import { Validator } from "../../middlewares/validate-request";
import { PaymentValidationSchemas } from "./payment.validation";

const router = Router();

router.post(
  "/setup-payment",
  auth(Role.CUSTOMER),
  Validator.validateRequest(PaymentValidationSchemas.setupPayment),
  PaymentControllers.setUpPayment
);

router.post("/confirmation", PaymentControllers.purchaseConfirmation);

export const PaymentRoutes = router;

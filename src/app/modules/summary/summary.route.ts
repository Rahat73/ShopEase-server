import { Router } from "express";
import { SummaryControllers } from "./summary.controller";

const router = Router();

router.get("/shopease", SummaryControllers.getShopEaseSummary);

export const SummaryRoutes = router;

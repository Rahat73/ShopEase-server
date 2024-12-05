import { Router } from "express";
import auth from "../../middlewares/auth";
import { Role } from "@prisma/client";
import { FollowControllers } from "./follow.controller";

const router = Router();

router.get("/", auth(Role.CUSTOMER), FollowControllers.getFollowedVendors);

router.post("/:vendorId", auth(Role.CUSTOMER), FollowControllers.followVendor);

export const FollowRoutes = router;

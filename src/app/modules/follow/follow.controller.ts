import { Request, Response } from "express";
import { IAuthUser } from "../../types";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import { FollowServices } from "./follow.service";

const followVendor = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const vendorId = req.params.vendorId;
    const result = await FollowServices.followVendor(
      user as IAuthUser,
      vendorId
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: result.message,
      data: result,
    });
  }
);

const getFollowedVendors = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await FollowServices.getFollowedVendors(user as IAuthUser);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Followed vendors fetched successfully!",
      data: result,
    });
  }
);

export const FollowControllers = {
  followVendor,
  getFollowedVendors,
};

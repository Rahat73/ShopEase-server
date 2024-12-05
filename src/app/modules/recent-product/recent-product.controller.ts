import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import { IAuthUser } from "../../types";
import { RecentProductServices } from "./recent-product.service";

const addRecentProduct = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const result = await RecentProductServices.addRecentProduct(
      req.user as IAuthUser,
      req.body.productId
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product added to recent products successfully!",
      data: result,
    });
  }
);

const getRecentProducts = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const result = await RecentProductServices.getRecentProducts(
      req.user as IAuthUser
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Recent products fetched successfully!",
      data: result,
    });
  }
);

export const RecentProductControllers = {
  addRecentProduct,
  getRecentProducts,
};

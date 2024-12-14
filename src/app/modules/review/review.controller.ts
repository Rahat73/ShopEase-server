import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import { IAuthUser } from "../../types";
import { ReviewServices } from "./review.service";

const addReview = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const payload = req.body;
    const result = await ReviewServices.addReview(user as IAuthUser, payload);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Review added successfully!",
      data: result,
    });
  }
);

const getProductReviews = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await ReviewServices.getProductReviews(productId);
  res.status(200).json({
    statusCode: 200,
    success: true,
    message: "Product reviews fetched successfully!",
    data: result,
  });
});

const addReply = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const payload = req.body;
    const result = await ReviewServices.addReply(user as IAuthUser, payload);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Reply added successfully!",
      data: result,
    });
  }
);

const getUnrepliedReviews = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await ReviewServices.getUnrepliedReviews(user as IAuthUser);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Unreplied reviews fetched successfully!",
      data: result,
    });
  }
);

export const ReviewControllers = {
  addReview,
  getProductReviews,
  addReply,
  getUnrepliedReviews,
};

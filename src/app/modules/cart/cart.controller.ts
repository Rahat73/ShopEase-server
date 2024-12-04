import { Request, Response } from "express";
import { IAuthUser } from "../../types";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import { CartServices } from "./cart.service";

const addToCart = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await CartServices.addToCart(user as IAuthUser, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product added to cart successfully!",
      data: result,
    });
  }
);

export const CartControllers = {
  addToCart,
};

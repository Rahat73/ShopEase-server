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

const getMyCart = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await CartServices.getMyCart(user as IAuthUser);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Cart fetched successfully!",
      data: result,
    });
  }
);

const updateCartItemQuantity = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const productId = req.params.id;
    const quantity = req.body.quantity;

    const result = await CartServices.updateCartItemQuantity(
      user as IAuthUser,
      productId,
      quantity
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Cart item updated successfully!",
      data: result,
    });
  }
);

const deleteCartItem = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const productId = req.params.id;
    const result = await CartServices.deleteCartItem(
      user as IAuthUser,
      productId
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Cart item deleted successfully!",
      data: result,
    });
  }
);

export const CartControllers = {
  addToCart,
  getMyCart,
  updateCartItemQuantity,
  deleteCartItem,
};

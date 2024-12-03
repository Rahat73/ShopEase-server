import { Request, Response } from "express";
import { IAuthUser, IFile } from "../../types";
import catchAsync from "../../utils/catch-async";
import { ProductServices } from "./product.service";
import sendResponse from "../../utils/send-response";

const addProduct = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const product = req.body;
    const files = req.files as IFile[];

    const result = await ProductServices.addProduct(
      user as IAuthUser,
      product,
      files
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product added successfully!",
      data: result,
    });
  }
);

export const ProductControllers = {
  addProduct,
};

import { Request, Response } from "express";
import { IAuthUser, IFile } from "../../types";
import catchAsync from "../../utils/catch-async";
import { ProductServices } from "./product.service";
import sendResponse from "../../utils/send-response";
import pick from "../../utils/pick";
import { dataDisplayOptions } from "../../constants";
import { productFilterableFields } from "./product.constant";

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, productFilterableFields);
  const options = pick(req.query, dataDisplayOptions);

  const result = await ProductServices.getAllProducts(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Products fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const productId = req.params.productId;
  const result = await ProductServices.getProductById(productId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Product fetched successfully!",
    data: result,
  });
});

const getMyProducts = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const filters = pick(req.query, productFilterableFields);
    const options = pick(req.query, dataDisplayOptions);

    const result = await ProductServices.getMyProducts(
      user as IAuthUser,
      filters,
      options
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  }
);

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

const updateProduct = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const productId = req.params.productId;
    const product = req.body;
    const files = req.files as IFile[];

    const result = await ProductServices.updateProduct(
      user as IAuthUser,
      productId,
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

const deleteProduct = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const productId = req.params.productId;
    const result = await ProductServices.deleteProduct(
      user as IAuthUser,
      productId
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  }
);

export const ProductControllers = {
  getAllProducts,
  getProductById,
  getMyProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};

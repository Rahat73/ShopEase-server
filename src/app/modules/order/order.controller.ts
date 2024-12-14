import { Request, Response } from "express";
import { dataDisplayOptions } from "../../constants";
import { IAuthUser } from "../../types";
import catchAsync from "../../utils/catch-async";
import pick from "../../utils/pick";
import sendResponse from "../../utils/send-response";
import { OrderServices } from "./order.service";
import { orderFilterableFields } from "./order.constant";

const createOrder = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await OrderServices.createOrder(user as IAuthUser, req.body);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  }
);

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  //   const filters = pick(req.query, orderFilterableFields);
  const options = pick(req.query, dataDisplayOptions);

  const result = await OrderServices.getAllOrders(options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders fetched successfully!",
    meta: result.meta,
    data: result.data,
  });
});

const getMyOrders = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const filters = pick(req.query, orderFilterableFields);
    const options = pick(req.query, dataDisplayOptions);

    const result = await OrderServices.getMyOrders(
      user as IAuthUser,
      filters,
      options
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Orders fetched successfully!",
      meta: result.meta,
      data: result.data,
    });
  }
);

const getOrderById = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const orderId = req.params.orderId;
    const result = await OrderServices.getOrderById(user as IAuthUser, orderId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  }
);

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
};

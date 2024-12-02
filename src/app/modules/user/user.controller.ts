import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import { UserServices } from "./user.service";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createAdmin(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin created successfuly!",
    data: result,
  });
});

const createVendor = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createVendor(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vendor created successfuly!",
    data: result,
  });
});

const createCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createCustomer(req);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Customer created successfuly!",
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
  createVendor,
  createCustomer,
};

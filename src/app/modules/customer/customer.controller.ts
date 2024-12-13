import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import { CustomerServices } from "./customer.service";

const getAllCustomer = catchAsync(async (req: Request, res: Response) => {
  const result = await CustomerServices.getAllCustomers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Customer fetched successfully!",
    data: result,
  });
});

const getCustomerById = catchAsync(async (req: Request, res: Response) => {
  const vendorId = req.params.vendorId;
  const result = await CustomerServices.getCustomerById(vendorId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Customer fetched successfully!",
    data: result,
  });
});

export const CustomerControllers = {
  getAllCustomer,
  getCustomerById,
};

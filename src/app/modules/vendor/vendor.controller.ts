import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import { VendorServices } from "./vendor.service";
import sendResponse from "../../utils/send-response";

const getAllVendors = catchAsync(async (req: Request, res: Response) => {
  const result = await VendorServices.getAllVendors();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vendors fetched successfully!",
    data: result,
  });
});

const getVendorsDetailedInfo = catchAsync(
  async (req: Request, res: Response) => {
    const result = await VendorServices.getVendorsDetailedInfo();
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Vendors fetched successfully!",
      data: result,
    });
  }
);

const getVendorById = catchAsync(async (req: Request, res: Response) => {
  const vendorId = req.params.vendorId;
  const result = await VendorServices.getVendorById(vendorId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vendor fetched successfully!",
    data: result,
  });
});

const updateVendor = catchAsync(async (req: Request, res: Response) => {
  const vendorId = req.params.vendorId;
  const payload = req.body;
  const result = await VendorServices.updateVendor(vendorId, payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Vendor updated successfully!",
    data: result,
  });
});

export const VendorControllers = {
  getAllVendors,
  getVendorsDetailedInfo,
  getVendorById,
  updateVendor,
};

import { Request } from "express";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import { SummaryServices } from "./summary.service";
import { IAuthUser } from "../../types";

const getShopEaseSummary = catchAsync(async (req, res) => {
  const result = await SummaryServices.getShopEaseSummary();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Summary fetched successfully!",
    data: result,
  });
});

const getProductSellPerMonth = catchAsync(async (req, res) => {
  const result = await SummaryServices.getProductSellPerMonth();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Data fetched successfully!",
    data: result,
  });
});

const getVendorSummary = catchAsync(
  async (req: Request & { user?: IAuthUser }, res) => {
    const user = req.user;

    const result = await SummaryServices.getVendorSummary(user as IAuthUser);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Summary fetched successfully!",
      data: result,
    });
  }
);

const getProductSellPerMonthByVendor = catchAsync(
  async (req: Request & { user?: IAuthUser }, res) => {
    const user = req.user;

    const result = await SummaryServices.getProductSellPerMonthByVendor(
      user as IAuthUser
    );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Data fetched successfully!",
      data: result,
    });
  }
);

export const SummaryControllers = {
  getShopEaseSummary,
  getProductSellPerMonth,
  getVendorSummary,
  getProductSellPerMonthByVendor,
};

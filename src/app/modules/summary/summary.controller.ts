import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import { SummaryServices } from "./summary.service";

const getShopEaseSummary = catchAsync(async (req, res) => {
  const result = await SummaryServices.getShopEaseSummary();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Summary fetched successfully!",
    data: result,
  });
});

export const SummaryControllers = {
  getShopEaseSummary,
};

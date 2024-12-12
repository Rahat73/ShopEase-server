import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import { PaymentServices } from "./payment.service";
import { IAuthUser } from "../../types";

const setUpPayment = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const { orderId } = req.body;
    const result = await PaymentServices.setUpPayment(
      user as IAuthUser,
      orderId
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "You will be redirected to the payment gateway",
      data: result,
    });
  }
);

const purchaseConfirmation = catchAsync(async (req, res) => {
  const { trxId, orderId, status } = req.query;

  const result = await PaymentServices.purchaseConfirmation(
    trxId as string,
    orderId as string,
    status as string
  );

  res.send(result);
});

export const PaymentControllers = {
  setUpPayment,
  purchaseConfirmation,
};

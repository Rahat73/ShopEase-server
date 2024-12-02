import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import { AuthServices } from "./auth.service";
import sendResponse from "../../utils/send-response";
import { IAuthUser } from "../../types";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginUser(req.body);

  //   const { refreshToken } = result;

  //   res.cookie("refreshToken", refreshToken, {
  //     secure: false,
  //     httpOnly: true,
  //   });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged in successfully!",
    data: {
      user: result.user,
      accessToken: result.accessToken,
    },
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await AuthServices.changePassword(user, req.body);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Password changed successfully",
      data: result,
    });
  }
);

const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  await AuthServices.forgotPassword(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reset password link sent to your email!",
    data: null,
  });
});

const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization || "";

  await AuthServices.resetPassword(token, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password reset successful! Please login",
    data: null,
  });
});

export const AuthControllers = {
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
};

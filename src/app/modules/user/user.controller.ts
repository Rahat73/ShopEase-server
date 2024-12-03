import { Request, Response } from "express";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import { UserServices } from "./user.service";
import { IAuthUser } from "../../types";

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

const getMyProfile = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await UserServices.getMyProfile(user as IAuthUser);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "My profile data fetched!",
      data: result,
    });
  }
);

const updateMyProfie = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;

    const result = await UserServices.updateMyProfie(user as IAuthUser, req);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Profile updated successfully!",
      data: result,
    });
  }
);

const changeStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.changeStatus(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Status changed successfuly!",
    data: result,
  });
});

export const UserControllers = {
  createAdmin,
  createVendor,
  createCustomer,
  getMyProfile,
  updateMyProfie,
  changeStatus,
};

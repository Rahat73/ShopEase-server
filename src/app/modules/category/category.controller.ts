import { Request, Response } from "express";
import { IFile } from "../../types";
import catchAsync from "../../utils/catch-async";
import sendResponse from "../../utils/send-response";
import { CategoryServices } from "./category.service";

const addCategory = catchAsync(async (req: Request, res: Response) => {
  const category = req.body;
  const file = req.file as IFile;

  const result = await CategoryServices.addCategory(category, file);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category added successfully!",
    data: result,
  });
});

export const CategoryControllers = {
  addCategory,
};

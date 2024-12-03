import { Category } from "@prisma/client";
import prisma from "../../utils/prisma";
import { IFile } from "../../types";

const addCategory = async (
  payload: Category,
  file: IFile
): Promise<Category> => {
  if (file) {
    payload.icon = file.path;
  }

  const result = await prisma.category.create({
    data: payload,
  });
  return result;
};

export const CategoryServices = {
  addCategory,
};

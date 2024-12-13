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

const getAllCategories = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const updateCategory = async (
  id: string,
  file: IFile,
  payload: Partial<Category>
) => {
  if (file) {
    payload.icon = file.path;
  }

  const result = await prisma.category.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

export const CategoryServices = {
  addCategory,
  getAllCategories,
  updateCategory,
};

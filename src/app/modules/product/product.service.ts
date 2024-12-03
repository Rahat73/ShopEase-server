import { Product } from "@prisma/client";
import { IAuthUser, IFile } from "../../types";
import { Request } from "express";
import prisma from "../../utils/prisma";

const addProduct = async (
  user: IAuthUser,
  product: Product,
  files: IFile[]
) => {
  const vendorInfo = await prisma.vendor.findUniqueOrThrow({
    where: {
      email: user?.email,
      isBlacklisted: false,
    },
  });

  if (files.length > 0) {
    product.images = files.map((file) => file.path);
  }

  const productData = {
    ...product,
    vendorId: vendorInfo.id,
  };

  const result = await prisma.product.create({
    data: productData,
  });

  return result;
};

export const ProductServices = {
  addProduct,
};

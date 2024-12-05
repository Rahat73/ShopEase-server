import { IAuthUser } from "../../types";
import prisma from "../../utils/prisma";

const addRecentProduct = async (user: IAuthUser, productId: string) => {
  const customerInfo = await prisma.customer.findUniqueOrThrow({
    where: { email: user?.email },
  });

  await prisma.product.findUniqueOrThrow({
    where: { id: productId },
  });

  const result = await prisma.$transaction(async (tx) => {
    const result = await tx.recentProduct.create({
      data: {
        customerId: customerInfo.id,
        productId,
      },
    });

    const existingRecentProducts = await tx.recentProduct.findMany({
      where: {
        customerId: customerInfo.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (existingRecentProducts && existingRecentProducts.length >= 10) {
      await tx.recentProduct.deleteMany({
        where: {
          customerId: customerInfo.id,
          createdAt: {
            lt: existingRecentProducts[9].createdAt,
          },
        },
      });
    }

    return result;
  });

  return result;
};

const getRecentProducts = async (user: IAuthUser) => {
  const customerInfo = await prisma.customer.findUniqueOrThrow({
    where: { email: user?.email },
  });

  const result = await prisma.recentProduct.findMany({
    where: {
      customerId: customerInfo.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      product: true,
    },
  });
  return result;
};

export const RecentProductServices = {
  addRecentProduct,
  getRecentProducts,
};

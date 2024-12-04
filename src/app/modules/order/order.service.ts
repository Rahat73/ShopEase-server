import { Order, Product } from "@prisma/client";
import { IAuthUser, IDataDisplayOptions } from "../../types";
import prisma from "../../utils/prisma";
import AppError from "../../errors/app-error";
import { dataDisplayHelper } from "../../utils/data-display-helper";
import { orderSortableFields } from "./order.constant";

const createOrder = async (
  user: IAuthUser,
  order: {
    discount: number;
    orderItems: { productId: string; quantity: number }[];
  }
): Promise<Order> => {
  const customerInfo = await prisma.customer.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const productsDetails = await Promise.all(
    order.orderItems.map(async (item) => {
      const productInfo = await prisma.product.findUniqueOrThrow({
        where: {
          id: item.productId,
        },
      });

      if (productInfo.inventoryCount < item.quantity) {
        throw new AppError(409, "Product out of stock");
      }

      return { productInfo, quantity: item.quantity };
    })
  );

  const totalAmount = productsDetails.reduce(
    (total, { productInfo, quantity }) => {
      return total + (productInfo.price - productInfo.discount) * quantity;
    },
    0
  );

  console.log(totalAmount);

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdOrder = await transactionClient.order.create({
      data: {
        ...order,
        customerId: customerInfo.id,
        vendorId: productsDetails[0].productInfo.vendorId,
        totalAmount,
        orderItems: {
          create: productsDetails.map(({ productInfo, quantity }) => ({
            productId: productInfo.id,
            quantity,
            price: productInfo.price - productInfo.discount,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    await Promise.all(
      productsDetails.map(({ productInfo, quantity }) =>
        transactionClient.product.update({
          where: { id: productInfo.id },
          data: { inventoryCount: productInfo.inventoryCount - quantity },
        })
      )
    );

    return createdOrder;
  });
  return result;
};

const getAllOrders = async (options: IDataDisplayOptions) => {
  const { page, limit, skip, sortBy, sortOrder } =
    dataDisplayHelper.calculatePagination(options, orderSortableFields);

  const result = await prisma.order.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      orderItems: true,
    },
  });

  const total = await prisma.order.count();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const OrderServices = {
  createOrder,
  getAllOrders,
};
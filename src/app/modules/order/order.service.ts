import { Order, Prisma } from "@prisma/client";
import AppError from "../../errors/app-error";
import { IAuthUser, IDataDisplayOptions } from "../../types";
import { dataDisplayHelper } from "../../utils/data-display-helper";
import prisma from "../../utils/prisma";
import { orderSortableFields } from "./order.constant";
import { IOrderFilterRequest } from "./order.interface";

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
      return (
        total +
        (productInfo.price - (productInfo.price * productInfo.discount) / 100) *
          quantity
      );
    },
    0
  );

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
          data: {
            inventoryCount: productInfo.inventoryCount - quantity,
            soldCount: productInfo.soldCount + quantity,
          },
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
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
      vendor: {
        select: {
          shopName: true,
          phone: true,
          address: true,
          email: true,
        },
      },
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

const getMyOrders = async (
  user: IAuthUser,
  filters: IOrderFilterRequest,
  options: IDataDisplayOptions
) => {
  let userInfo;

  if (user?.role === "CUSTOMER") {
    userInfo = await prisma.customer.findUniqueOrThrow({
      where: {
        email: user?.email,
      },
    });
  } else if (user?.role === "VENDOR") {
    userInfo = await prisma.vendor.findUniqueOrThrow({
      where: {
        email: user?.email,
      },
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    dataDisplayHelper.calculatePagination(options, orderSortableFields);

  const andConditions: Prisma.OrderWhereInput[] = [];

  if (Object.keys(filters).length > 0) {
    andConditions.push({
      AND: Object.entries(filters).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const whereConditions: Prisma.OrderWhereInput = {
    customerId: user?.role === "CUSTOMER" ? userInfo?.id : undefined,
    vendorId: user?.role === "VENDOR" ? userInfo?.id : undefined,
    AND: andConditions,
  };

  const result = await prisma.order.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      orderItems: true,
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
      vendor: {
        select: {
          shopName: true,
          phone: true,
        },
      },
    },
  });

  const total = await prisma.order.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getOrderById = async (user: IAuthUser, orderId: string) => {
  const customerInfo = await prisma.customer.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const result = await prisma.order.findUniqueOrThrow({
    where: { id: orderId, customerId: customerInfo.id },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
      customer: {
        select: {
          name: true,
          email: true,
        },
      },
      vendor: {
        select: {
          shopName: true,
          phone: true,
          address: true,
        },
      },
      review: true,
    },
  });
  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
};

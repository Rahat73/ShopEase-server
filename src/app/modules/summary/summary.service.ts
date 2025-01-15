import { monthNames } from "../../constants";
import { IAuthUser } from "../../types";
import prisma from "../../utils/prisma";

const getShopEaseSummary = async () => {
  const shops = await prisma.vendor.findMany({
    where: {
      isBlacklisted: false,
    },
  });

  const products = await prisma.product.findMany({});

  const customers = await prisma.customer.findMany({});

  const orders = await prisma.order.findMany({});

  return {
    totalShops: shops.length,
    totalProducts: products.length,
    totalCustomers: customers.length,
    totalOrders: orders.length,
  };
};

const getProductSellPerMonth = async () => {
  const orderItems = await prisma.orderItem.findMany({
    select: {
      quantity: true,
      order: {
        select: {
          createdAt: true,
        },
      },
    },
  });

  const result = monthNames.map((month) => ({ month, products: 0 }));

  orderItems.forEach((item) => {
    const createdAt = new Date(item.order.createdAt);
    const monthIndex = createdAt.getMonth();
    result[monthIndex].products += item.quantity;
  });

  return result;
};

const getVendorSummary = async (user: IAuthUser) => {
  const vendorInfo = await prisma.vendor.findUniqueOrThrow({
    where: {
      email: user?.email,
      isBlacklisted: false,
    },
    include: {
      follow: true,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      vendorId: vendorInfo.id,
    },
  });

  const orders = await prisma.order.findMany({
    where: {
      vendorId: vendorInfo.id,
    },
  });

  return {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalFollowers: vendorInfo.follow.length,
  };
};

const getProductSellPerMonthByVendor = async (user: IAuthUser) => {
  const vendorInfo = await prisma.vendor.findUniqueOrThrow({
    where: {
      email: user?.email,
      isBlacklisted: false,
    },
  });

  const orderItems = await prisma.orderItem.findMany({
    where: {
      order: {
        vendorId: vendorInfo.id,
      },
    },

    select: {
      quantity: true,
      order: {
        select: {
          createdAt: true,
        },
      },
    },
  });

  const result = monthNames.map((month) => ({ month, products: 0 }));

  orderItems.forEach((item) => {
    const createdAt = new Date(item.order.createdAt);
    const monthIndex = createdAt.getMonth();
    result[monthIndex].products += item.quantity;
  });

  return result;
};

export const SummaryServices = {
  getShopEaseSummary,
  getProductSellPerMonth,
  getVendorSummary,
  getProductSellPerMonthByVendor,
};

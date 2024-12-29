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

export const SummaryServices = {
  getShopEaseSummary,
};

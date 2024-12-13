import prisma from "../../utils/prisma";

const getAllCustomers = async () => {
  const result = await prisma.customer.findMany({
    include: {
      user: {
        select: {
          isSuspended: true,
          id: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getCustomerById = async (id: string) => {
  const result = await prisma.customer.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  return result;
};

export const CustomerServices = {
  getAllCustomers,
  getCustomerById,
};

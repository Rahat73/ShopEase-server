import prisma from "../../utils/prisma";

const getAllVendors = async () => {
  const result = await prisma.vendor.findMany();
  return result;
};

const getVendorById = async (id: string) => {
  const result = await prisma.vendor.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  return result;
};

export const VendorServices = {
  getAllVendors,
  getVendorById,
};

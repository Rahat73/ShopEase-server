import { Vendor } from "@prisma/client";
import prisma from "../../utils/prisma";

const getAllVendors = async () => {
  const result = await prisma.vendor.findMany({
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

const getVendorsDetailedInfo = async () => {
  const result = await prisma.vendor.findMany({
    include: {
      _count: {
        select: { product: true },
      },
    },
    where: {
      isBlacklisted: false,
      user: {
        isSuspended: false,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
};

const getVendorById = async (id: string) => {
  const result = await prisma.vendor.findUniqueOrThrow({
    where: {
      id: id,
    },
    include: {
      follow: true,
    },
  });
  return result;
};

const updateVendor = async (id: string, payload: Partial<Vendor>) => {
  const result = await prisma.vendor.update({
    where: {
      id: id,
    },
    data: payload,
  });

  return result;
};

export const VendorServices = {
  getAllVendors,
  getVendorsDetailedInfo,
  getVendorById,
  updateVendor,
};

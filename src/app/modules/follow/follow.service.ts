import { IAuthUser } from "../../types";
import prisma from "../../utils/prisma";

const followVendor = async (user: IAuthUser, vendorId: string) => {
  const customerInfo = await prisma.customer.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  await prisma.vendor.findUniqueOrThrow({
    where: {
      id: vendorId,
    },
  });

  const existingFollow = await prisma.follow.findUnique({
    where: {
      customerId_vendorId: {
        customerId: customerInfo.id,
        vendorId,
      },
    },
  });

  if (existingFollow) {
    await prisma.follow.delete({
      where: {
        customerId_vendorId: {
          customerId: customerInfo.id,
          vendorId,
        },
      },
    });
    return { message: "Vendor unfollowed successfully" };
  } else {
    await prisma.follow.create({
      data: {
        customerId: customerInfo.id,
        vendorId,
      },
    });
    return { message: "Vendor followed successfully" };
  }
};

const getFollowedVendors = async (user: IAuthUser) => {
  const customerInfo = await prisma.customer.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const result = await prisma.follow.findMany({
    where: {
      customerId: customerInfo.id,
    },
    include: {
      vendor: true,
    },
  });
  return result;
};

export const FollowServices = {
  followVendor,
  getFollowedVendors,
};

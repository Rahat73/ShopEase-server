import { Coupon } from "@prisma/client";
import prisma from "../../utils/prisma";

const addCoupon = async (payload: Coupon): Promise<Coupon> => {
  const result = await prisma.coupon.create({
    data: payload,
  });
  return result;
};

const getAllCoupons = async (): Promise<Coupon[]> => {
  const result = await prisma.coupon.findMany();
  return result;
};

const updateCoupon = async (
  id: string,
  payload: Partial<Coupon>
): Promise<Coupon> => {
  const result = await prisma.coupon.update({
    where: {
      id: id,
    },
    data: payload,
  });
  return result;
};

const deleteCoupon = async (id: string): Promise<Coupon> => {
  const result = await prisma.coupon.delete({
    where: {
      id: id,
    },
  });
  return result;
};

export const CouponServices = {
  addCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
};

import catchAsync from "../../utils/catch-async";
import { CouponServices } from "./coupon.service";

const addCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.addCoupon(req.body);
  res.status(200).json({
    success: true,
    message: "Coupon added successfully!",
    data: result,
  });
});

const getAllCoupons = catchAsync(async (req, res) => {
  const result = await CouponServices.getAllCoupons();
  res.status(200).json({
    success: true,
    message: "Coupons fetched successfully!",
    data: result,
  });
});

const updateCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.updateCoupon(
    req.params.couponId,
    req.body
  );
  res.status(200).json({
    success: true,
    message: "Coupon updated successfully!",
    data: result,
  });
});

const deleteCoupon = catchAsync(async (req, res) => {
  const result = await CouponServices.deleteCoupon(req.params.couponId);
  res.status(200).json({
    success: true,
    message: "Coupon deleted successfully!",
    data: result,
  });
});

export const CouponControllers = {
  addCoupon,
  getAllCoupons,
  updateCoupon,
  deleteCoupon,
};

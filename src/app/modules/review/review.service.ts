import { OrderStatus, Review } from "@prisma/client";
import { IAuthUser } from "../../types";
import prisma from "../../utils/prisma";

const addReview = async (
  user: IAuthUser,
  payload: { productId: string; orderId: string; review: Partial<Review> }
) => {
  const { productId, orderId, review } = payload;

  const customerInfo = await prisma.customer.findUniqueOrThrow({
    where: { email: user?.email },
  });

  await prisma.product.findUniqueOrThrow({
    where: { id: productId },
  });

  await prisma.order.findUniqueOrThrow({
    where: {
      id: orderId,
      customerId: customerInfo.id,
      status: OrderStatus.COMPLETED,
      orderItems: {
        some: {
          productId,
        },
      },
    },
  });

  const result = await prisma.review.create({
    data: {
      ...review,
      productId,
      orderId,
      customerId: customerInfo.id,
    },
  });

  return result;
};

const getProductReviews = async (productId: string) => {
  const result = await prisma.review.findMany({
    where: {
      productId,
    },
    include: {
      customer: true,
      reviewReply: true,
    },
  });
  return result;
};

const addReply = async (
  user: IAuthUser,
  payload: { reviewId: string; content: string }
) => {
  const vendorInfo = await prisma.vendor.findUniqueOrThrow({
    where: {
      email: user?.email,
      isBlacklisted: false,
    },
  });

  const { reviewId, content } = payload;

  await prisma.product.findFirstOrThrow({
    where: {
      review: {
        some: {
          id: reviewId,
        },
      },
      vendorId: vendorInfo.id,
    },
  });

  const result = await prisma.reviewReply.create({
    data: {
      reviewId,
      content,
      vendorId: vendorInfo.id,
    },
  });

  return result;
};

const getUnrepliedReviews = async (user: IAuthUser) => {
  const vendorInfo = await prisma.vendor.findUniqueOrThrow({
    where: {
      email: user?.email,
      isBlacklisted: false,
    },
  });

  const result = await prisma.review.findMany({
    where: {
      reviewReply: null,
      product: {
        vendorId: vendorInfo.id,
      },
    },
    include: {
      order: true,
      product: true,
      customer: true,
    },
  });

  return result;
};

export const ReviewServices = {
  addReview,
  getProductReviews,
  addReply,
  getUnrepliedReviews,
};

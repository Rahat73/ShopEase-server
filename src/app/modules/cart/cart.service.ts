import { Cart } from "@prisma/client";
import { IAuthUser } from "../../types";
import prisma from "../../utils/prisma";
import AppError from "../../errors/app-error";

const addToCart = async (
  user: IAuthUser,
  cartItem: { productId: string; quantity: number }
): Promise<Cart> => {
  const customerInfo = await prisma.customer.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const productInfo = await prisma.product.findUniqueOrThrow({
    where: {
      id: cartItem.productId,
    },
  });

  const existingCart = await prisma.cart.findUnique({
    where: {
      customerId: customerInfo.id,
    },
    include: {
      cartItems: true,
    },
  });

  const result = await prisma.$transaction(async (tx) => {
    if (existingCart) {
      if (existingCart.vendorId !== productInfo.vendorId) {
        await tx.cartItem.deleteMany({
          where: {
            cartId: existingCart.id,
          },
        });
      }

      const existingCartItem = existingCart.cartItems.find(
        (item) => item.productId === cartItem.productId
      );

      if (existingCartItem) {
        await tx.cartItem.update({
          where: {
            cartId_productId: {
              cartId: existingCart.id,
              productId: cartItem.productId,
            },
          },
          data: {
            quantity: existingCartItem.quantity + cartItem.quantity,
          },
        });
      } else {
        await tx.cartItem.create({
          data: {
            cartId: existingCart.id,
            productId: cartItem.productId,
            quantity: cartItem.quantity,
          },
        });
      }
    } else {
      await tx.cart.create({
        data: {
          customerId: customerInfo.id,
          vendorId: productInfo.vendorId,
          cartItems: {
            create: {
              productId: cartItem.productId,
              quantity: cartItem.quantity,
            },
          },
        },
      });
    }

    const result = await tx.cart.findUniqueOrThrow({
      where: {
        customerId: customerInfo.id,
      },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return result;
  });

  return result;
};

export const CartServices = {
  addToCart,
};
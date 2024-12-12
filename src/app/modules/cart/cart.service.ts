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

        await tx.cart.update({
          where: {
            id: existingCart.id,
          },
          data: {
            vendorId: productInfo.vendorId,
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
        cartItems: true,
      },
    });

    return result;
  });

  return result;
};

const getMyCart = async (user: IAuthUser) => {
  const customerInfo = await prisma.customer.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const result = await prisma.cart.findUniqueOrThrow({
    where: {
      customerId: customerInfo.id,
    },
    include: {
      cartItems: {
        include: {
          product: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  return result;
};

const updateCartItemQuantity = async (
  user: IAuthUser,
  productId: string,
  quantity: number
) => {
  const customerInfo = await prisma.customer.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const existingCart = await prisma.cart.findUniqueOrThrow({
    where: {
      customerId: customerInfo.id,
    },
    include: {
      cartItems: true,
    },
  });

  const existingCartItem = existingCart.cartItems.find(
    (item) => item.productId === productId
  );

  if (!existingCartItem) {
    throw new AppError(409, "Cart item does not exist.");
  }

  await prisma.cartItem.update({
    where: {
      cartId_productId: {
        cartId: existingCart.id,
        productId: productId,
      },
    },
    data: {
      quantity,
    },
  });

  const result = await prisma.cart.findMany({
    where: {
      customerId: customerInfo.id,
    },
    include: {
      cartItems: true,
    },
  });

  return result;
};

const deleteCartItem = async (user: IAuthUser, productId: string) => {
  const customerInfo = await prisma.customer.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const existingCart = await prisma.cart.findUniqueOrThrow({
    where: {
      customerId: customerInfo.id,
    },
    include: {
      cartItems: true,
    },
  });

  const existingCartItem = existingCart.cartItems.find(
    (item) => item.productId === productId
  );

  if (!existingCartItem) {
    throw new AppError(409, "Cart item does not exist.");
  }

  await prisma.cartItem.delete({
    where: {
      cartId_productId: {
        cartId: existingCart.id,
        productId: productId,
      },
    },
  });

  const result = await prisma.cart.findMany({
    where: {
      customerId: customerInfo.id,
    },
    include: {
      cartItems: true,
    },
  });

  return result;
};

export const CartServices = {
  addToCart,
  getMyCart,
  updateCartItemQuantity,
  deleteCartItem,
};

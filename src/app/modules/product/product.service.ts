import { Prisma, Product } from "@prisma/client";
import { IAuthUser, IDataDisplayOptions, IFile } from "../../types";
import prisma from "../../utils/prisma";
import { IProductFilterRequest } from "./product.interface";
import { dataDisplayHelper } from "../../utils/data-display-helper";
import {
  productSearchableFields,
  productSortableFields,
} from "./product.constant";

const getAllProducts = async (
  params: IProductFilterRequest,
  options: IDataDisplayOptions
) => {
  const { limit, page, skip, sortBy, sortOrder } =
    dataDisplayHelper.calculatePagination(options, productSortableFields);

  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ProductWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: productSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  andConditions.push({
    vendor: {
      isBlacklisted: false,
      user: {
        isSuspended: false,
      },
    },
  });

  const whereConditons: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  let result;

  const discountedPriceQuery = `
  SELECT p.*, (p.price - (p.price * p.discount / 100)) AS discountedPrice
  FROM products p
  ${
    Object.keys(whereConditons).length
      ? `WHERE ${JSON.stringify(whereConditons)}`
      : ""
  }
  ORDER BY discountedPrice ${sortOrder === "asc" ? "ASC" : "DESC"}
  LIMIT ${limit} OFFSET ${skip};
`;

  if (sortBy === "price") {
    result = await prisma.$queryRawUnsafe<Product[]>(discountedPriceQuery);
  } else {
    result = await prisma.product.findMany({
      where: whereConditons,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  const total = await prisma.product.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getProductById = async (productId: string) => {
  const result = await prisma.product.findUniqueOrThrow({
    where: {
      id: productId,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      vendor: {
        select: {
          shopName: true,
          shopLogo: true,
          address: true,
          phone: true,
        },
      },
    },
  });
  return result;
};

const getMyProducts = async (
  user: IAuthUser,
  params: IProductFilterRequest,
  options: IDataDisplayOptions
) => {
  const vendorInfo = await prisma.vendor.findUniqueOrThrow({
    where: {
      email: user?.email,
      isBlacklisted: false,
    },
  });

  const { limit, page, skip, sortBy, sortOrder } =
    dataDisplayHelper.calculatePagination(options, productSortableFields);

  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ProductWhereInput[] = [];

  if (searchTerm) {
    andConditions.push({
      OR: productSearchableFields.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.entries(filterData).map(([key, value]) => ({
        [key]: value,
      })),
    });
  }

  const whereConditons: Prisma.ProductWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.product.findMany({
    where: {
      vendorId: vendorInfo.id,
      ...whereConditons,
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.product.count({
    where: {
      vendorId: vendorInfo.id,
      ...whereConditons,
    },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const addProduct = async (
  user: IAuthUser,
  product: Product,
  files: IFile[]
) => {
  const vendorInfo = await prisma.vendor.findUniqueOrThrow({
    where: {
      email: user?.email,
      isBlacklisted: false,
    },
  });

  if (files.length > 0) {
    product.images = files.map((file) => file.path);
  }

  const productData = {
    ...product,
    vendorId: vendorInfo.id,
  };

  const result = await prisma.product.create({
    data: productData,
  });

  return result;
};

const updateProduct = async (
  user: IAuthUser,
  productId: string,
  product: Partial<Product>,
  files: IFile[]
) => {
  const vendorInfo = await prisma.vendor.findUniqueOrThrow({
    where: {
      email: user?.email,
      isBlacklisted: false,
    },
  });

  if (files.length > 0) {
    product.images = files.map((file) => file.path);
  }

  await prisma.product.findUniqueOrThrow({
    where: {
      id: productId,
      vendorId: vendorInfo.id,
    },
  });

  const result = await prisma.product.update({
    where: {
      id: productId,
    },
    data: product,
  });

  return result;
};

const deleteProduct = async (user: IAuthUser, productId: string) => {
  const vendorInfo = await prisma.vendor.findUniqueOrThrow({
    where: {
      email: user?.email,
      isBlacklisted: false,
    },
  });

  await prisma.product.findUniqueOrThrow({
    where: {
      id: productId,
      vendorId: vendorInfo.id,
    },
  });

  const result = await prisma.product.delete({
    where: {
      id: productId,
    },
  });
  return result;
};

export const ProductServices = {
  getAllProducts,
  getProductById,
  getMyProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};

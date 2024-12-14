import { Role } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { Request } from "express";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { IAuthUser, IFile } from "../../types";
import { jwtHelpers } from "../../utils/jwt-helpers";
import prisma from "../../utils/prisma";
import AppError from "../../errors/app-error";

const createAdmin = async (req: Request) => {
  const file = req.file as IFile;

  if (file) {
    req.body.admin.profilePhoto = file.path;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.admin.email,
    password: hashedPassword,
    role: Role.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });

    return createdAdminData;
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    user: result,
    accessToken,
  };
};

const createVendor = async (req: Request) => {
  const file = req.file as IFile;

  const shopNameExists = await prisma.vendor.findUnique({
    where: {
      shopName: req.body.vendor.shopName,
    },
  });

  if (shopNameExists) {
    throw new AppError(409, "Shop name already exists!");
  }

  if (file) {
    req.body.vendor.shopLogo = file.path;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.vendor.email,
    password: hashedPassword,
    role: Role.VENDOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdVendorData = await transactionClient.vendor.create({
      data: req.body.vendor,
    });

    return createdVendorData;
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    user: result,
    accessToken,
  };
};

const createCustomer = async (req: Request) => {
  const file = req.file as IFile;

  if (file) {
    req.body.customer.profilePhoto = file.path;
  }

  const hashedPassword: string = await bcrypt.hash(req.body.password, 12);

  const userData = {
    email: req.body.customer.email,
    password: hashedPassword,
    role: Role.CUSTOMER,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });

    const createdCustomerData = await transactionClient.customer.create({
      data: req.body.customer,
    });

    return createdCustomerData;
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    user: result,
    accessToken,
  };
};

const getMyProfile = async (user: IAuthUser) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      isSuspended: false,
    },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });

  let profileInfo;

  if (userInfo.role === Role.SUPER_ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === Role.ADMIN) {
    profileInfo = await prisma.admin.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === Role.VENDOR) {
    profileInfo = await prisma.vendor.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === Role.CUSTOMER) {
    profileInfo = await prisma.customer.findUnique({
      where: {
        email: userInfo.email,
      },
    });
  }

  return { ...userInfo, ...profileInfo };
};

const updateMyProfie = async (user: IAuthUser, req: Request) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      isSuspended: false,
    },
  });

  const file = req.file as IFile;
  if (file) {
    if (userInfo.role === Role.VENDOR) {
      req.body.shopLogo = file.path;
    } else {
      req.body.profilePhoto = file.path;
    }
  }

  let profileInfo;

  if (userInfo.role === Role.SUPER_ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === Role.ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === Role.VENDOR) {
    profileInfo = await prisma.vendor.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  } else if (userInfo.role === Role.CUSTOMER) {
    profileInfo = await prisma.customer.update({
      where: {
        email: userInfo.email,
      },
      data: req.body,
    });
  }

  return { ...profileInfo };
};

const changeStatus = async (id: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
  });

  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      isSuspended: !user.isSuspended,
    },
  });
  return result;
};

export const UserServices = {
  createAdmin,
  createVendor,
  createCustomer,
  getMyProfile,
  updateMyProfie,
  changeStatus,
};

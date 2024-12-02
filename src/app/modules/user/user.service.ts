import { Admin, Customer, Role, Vendor } from "@prisma/client";
import { IFile } from "../../types";
import { Request } from "express";
import * as bcrypt from "bcrypt";
import prisma from "../../utils/prisma";

const createAdmin = async (req: Request): Promise<Admin> => {
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

  return result;
};

const createVendor = async (req: Request): Promise<Vendor> => {
  const file = req.file as IFile;

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

  return result;
};

const createCustomer = async (req: Request): Promise<Customer> => {
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

  return result;
};

export const UserServices = {
  createAdmin,
  createVendor,
  createCustomer,
};

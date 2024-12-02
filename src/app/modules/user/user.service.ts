import { Admin, Role } from "@prisma/client";
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

export const UserServices = {
  createAdmin,
};

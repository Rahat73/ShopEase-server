import { Role } from "@prisma/client";
import prisma from "../utils/prisma";
import * as bcrypt from "bcrypt";

const data = {
  password: "123456",
  name: "Rahat Ashik",
  email: "admin@mail.com",
  phone: "01303211682",
  role: Role.ADMIN,
  profilePhoto:
    "https://res.cloudinary.com/damvwxpdq/image/upload/v1719337899/2030020003-Rahat.jpg",
};

const seedAdmin = async () => {
  //when database is connected, we will check is there any user who is admin
  const isAdminExits = await prisma.user.findFirst({
    where: {
      role: Role.ADMIN,
    },
  });

  const hashedPassword: string = await bcrypt.hash(data.password, 12);
  if (!isAdminExits) {
    await prisma.$transaction(async (transactionClient) => {
      await transactionClient.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          role: data.role,
        },
      });

      await transactionClient.admin.create({
        data: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          profilePhoto: data.profilePhoto,
        },
      });
    });
  }
};

export default seedAdmin;

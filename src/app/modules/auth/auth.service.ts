import { Secret } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/app-error";
import { jwtHelpers } from "../../utils/jwt-helpers";
import prisma from "../../utils/prisma";
import * as bcrypt from "bcrypt";
import emailSender from "../../utils/email-sender";
import { IAuthUser } from "../../types";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      isSuspended: false,
    },
    include: {
      admin: true,
      vendor: true,
      customer: true,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new AppError(401, "Password is incorrect!");
  }
  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  // const refreshToken = jwtHelpers.generateToken(
  //   {
  //     email: userData.email,
  //     role: userData.role,
  //   },
  //   config.jwt.refresh_token_secret as Secret,
  //   config.jwt.refresh_token_expires_in as string
  // );

  return {
    user: {
      id: userData.id,
      email: userData.email,
      role: userData.role,
      admin: userData.admin,
      vendor: userData.vendor,
      customer: userData.customer,
    },
    accessToken,
    //   refreshToken,
  };
};

const changePassword = async (
  user: IAuthUser,
  payload: Record<string, string>
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      isSuspended: false,
    },
  });

  const isCorrectPassword: boolean = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new AppError(401, "Password is incorrect!");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: userData.email,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    message: "Password changed successfully!",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      isSuspended: false,
    },
  });

  const resetPassToken = jwtHelpers.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.reset_pass_secret as Secret,
    config.jwt.reset_pass_token_expires_in as string
  );

  const resetPassLink =
    config.reset_pass_link + `?userId=${userData.id}&token=${resetPassToken}`;

  await emailSender(
    userData.email,
    `
        <div>
            <p>Dear ${userData.role},</p>
            <p>Your password reset link 
                <a href=${resetPassLink}>
                    <button>
                        Reset Password
                    </button>
                </a>
            </p>
  
        </div>
        `
  );
};

const resetPassword = async (
  token: string,
  payload: { id: string; password: string }
) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      isSuspended: false,
    },
  });

  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.jwt.reset_pass_secret as Secret
  );

  if (!isValidToken) {
    throw new AppError(403, "Forbidden!");
  }

  // hash password
  const password = await bcrypt.hash(payload.password, 12);

  // update into database
  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password,
    },
  });
};

export const AuthServices = {
  loginUser,
  changePassword,
  forgotPassword,
  resetPassword,
};

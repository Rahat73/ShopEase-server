import { NextFunction, Request, Response } from "express";
import { Secret } from "jsonwebtoken";
import AppError from "../errors/app-error";
import { jwtHelpers } from "../utils/jwt-helpers";
import config from "../config";
import prisma from "../utils/prisma";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new AppError(401, "You are not authorized!");
      }

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret
      );

      req.user = verifiedUser;

      await prisma.user.findUniqueOrThrow({
        where: {
          email: verifiedUser.email,
          isSuspended: false,
        },
      });

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new AppError(403, "Forbidden!");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import AppError from "../errors/app-error";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = 500;
  const success = false;
  let message = err.message || "Something went wrong!";
  let error = err;

  if (err instanceof Prisma.PrismaClientValidationError) {
    message = "Validation Error";
    error = err.message;
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      statusCode = 409;
      message = "Duplicate Key error";
      error = err.meta;
    } else if (err.code === "P2025") {
      statusCode = 404;
    }
  } else if (err instanceof ZodError) {
    statusCode = 400;
    message = err.issues[0].message;
    error = err.issues;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
  }

  res.status(statusCode).json({
    success,
    status: statusCode,
    message,
    // error,
  });
};

export default globalErrorHandler;

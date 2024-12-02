import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validateRequest =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedBody = await schema.parseAsync({
        body: req.body,
      });
      req.body = parsedBody.body;
      return next();
    } catch (err) {
      next(err);
    }
  };

export default validateRequest;

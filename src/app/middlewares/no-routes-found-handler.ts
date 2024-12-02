import { Request, Response } from "express";

const noRoutesFound = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "API NOT FOUND!",
    // error: {
    //   path: req.originalUrl,
    //   message: "Your requested path is not found!",
    // },
  });
};

export default noRoutesFound;

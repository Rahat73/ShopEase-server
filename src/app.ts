import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/global-error-handler";
import noRoutesFound from "./app/middlewares/no-routes-found-handler";
import cookieParser from "cookie-parser";
import router from "./app/routes";

const app: Application = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "Welcome to Shopease Server..",
  });
});

app.use("/api", router);

app.use(globalErrorHandler);

app.use(noRoutesFound);

export default app;

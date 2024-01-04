import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mainRouter from "./routers";
import cors from "cors";


dotenv.config();

const app: Express = express();
app.use(express.json({limit: '200mb'}));
app.use(express.urlencoded({limit: '200mb'}));
app.use(
  cors({
    origin: "*",
  })
);
const port = 8000;
app.use(bodyParser.json());
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server with prisma");
});
app.use("/api", mainRouter);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(500).json({ _errors: [err.message] });
  }
  return res.status(400).json({ ...err });
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

import { NextFunction, Request, Response, Router } from "express";
import { login } from "../controllers/authController";
import { validateSchema } from "../schema";
import {
  LoginUserSchema,
  loginUserSchema,
  registerUserSchema,
} from "../schema/auth";

const loginRouter = Router();

loginRouter.post(
  "/",
  validateSchema(loginUserSchema),
  async (req: Request, res: Response) => {
    try {
      
      const token = await login(req.inputs as LoginUserSchema);
      if (token != null) {
        res.status(200).json(token);
      } else {
        res.status(401).json({ err: "Authentication failed" });
      }
    } catch (err) {
      console.log(err);
      return res.status(404).json({ err: "Authentication failed" });
    }
  }
);

export default loginRouter;

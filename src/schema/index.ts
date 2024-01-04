import { log } from "console";
import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

export const validateSchema =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.inputs = await schema.parseAsync({
        ...req.body,
        ...req.query,
        ...req.params,
      });
      console.log(req.inputs, "reqinputs\n");
      return next();
    } catch (error: any) {
      next(error?.format());
    }
  };

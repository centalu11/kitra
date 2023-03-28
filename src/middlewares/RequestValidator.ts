import { Request, Response, NextFunction } from "express";
import validator from "../helpers/validator";

export const validateQuery = (rules: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validator(req.query, rules, {}, (err, status) => {
      if (!status) {
        res.status(403).send({
          message: "Request validation failed",
          data: err,
        });
      } else {
        next();
      }
    }).catch((error) =>
      console.log("Validate Request Middleware Error", error)
    );
  };
};

export const validateBody = (rules: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validator(req.body, rules, {}, (err, status) => {
      if (!status) {
        res.status(403).send({
          message: "Request validation failed",
          data: err,
        });
      } else {
        next();
      }
    }).catch((error) =>
      console.log("Validate Request Middleware Error", error)
    );
  };
};

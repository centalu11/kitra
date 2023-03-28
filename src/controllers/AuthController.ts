import { Request, Response, NextFunction } from "express";
import { User } from "../entities/User";
import dataSource from "../data-source";

export class AuthController {
  static login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userRepository = dataSource.getRepository(User);

      const user = await userRepository.findOneBy({
        email: req.body.email,
      });

      if (!user || !user.isPasswordValid(req.body.password)) {
        throw new Error("Invalid email or password");
      }

      return res.status(200).send({
        message: "User Successfully Logged In",
        user_id: user.id,
      });
    } catch (error) {
      return res.status(400).send({
        message: error.message || "Cannot login at the moment",
      });
    }
  };
}

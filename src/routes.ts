import { Router } from "express";
import { AuthController, GeolocationController } from "./controllers";
import { validateQuery, validateBody } from "./middlewares/RequestValidator";

const routes = Router();

routes.post(
  "/v1/auth/login",
  [
    validateBody({
      email: "required|email|string",
      password: "required|string",
    }),
  ],
  AuthController.login
);

routes.get(
  "/v1/geolocation",
  [
    validateQuery({
      latitude: "required|numeric",
      longitude: "required|numeric",
      distance: "required|numeric|in:1,10",
      prize_value: "integer|between:10,30",
    }),
  ],
  GeolocationController.findTreasureBox
);

export default routes;

import "reflect-metadata";
import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import routes from "./routes";
import dataSource from "./data-source";

dotenv.config();

dataSource
  .initialize()
  .then(async () => {
    console.log("Data Source has been initialized");

    const app = express();
    app.use(bodyParser.json());
    app.use("/kitra", routes);

    // start express server
    const port = process.env.APP_PORT || 3005;
    app.listen(port, () => {
      console.log(`Server started at port ${port}`);
    });
  })
  .catch((error) =>
    console.log("Error during Data Source initialization during", error)
  );

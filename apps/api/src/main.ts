import express from 'express';
import { ormDataSource } from "@libs/orm";
import cookieParser from "cookie-parser";
import cors from 'cors';
import router from "./router";
import { httpErrorMiddleware } from "./middleware/errorMiddleware";

ormDataSource.initialize().then(() => {
  const app = express();

  app.use(cookieParser());
  app.use(express.json());

  app.use(
    cors({
    credentials: true,
    origin: process.env.ALLOW_ORIGIN,
  }));

  app.use(router);

  app.use(httpErrorMiddleware);

  app.listen(process.env.PORT, () => {
    console.log(`Server run on ${process.env.PORT}`)
  })
})

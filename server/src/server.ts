import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import database from "./schema/config/database";
import userRoute from './schema/routes/User'
import entryRoute from './schema/routes/ArtWorks'

const main = () => {
dotenv.config();

  const app = express();

  app.use(cors({
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  }));
  app.use(cors({ origin: '*' }));
  app.use(express.json());

  database
    .initialize()
    .then(() => {
      console.log("Database has been initialized!");
    })
    .catch((err: any) => {
      console.error(err);
    });

  app.use("/server/user", userRoute);
  app.use("/server/entries", entryRoute);


  const PORT = process.env.PORT;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

main();


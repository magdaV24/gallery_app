import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Users } from "../entities/Users";
import { ArtWorks } from "../entities/ArtWorks";

dotenv.config();
const database = new DataSource({
    type: "mysql",
    host: 'localhost',
    database: "art_gallery",
    username: "root",
    password: process.env.DB_PASSWORD,
    logging: true,
    synchronize: true,
    entities: [Users, ArtWorks],
  });

  export default database;
import mongoose, { Model } from "mongoose";
import { logger } from "./logger";

let db: any = null;

var connect = async function (uri: string, options: any, dbName?: string) {
  async function establishConnection() {
    mongoose.connect(uri, options);
    db = mongoose.connection;
    db.on("error", logger.error);
    db.once("open", function callback() {
      logger.info("connected to mongoose!");
    });

    // return mongoose with established connection
    return mongoose;
  }

  try {
    if (db != null) {
      logger.info(`db connection is already alive`);
      return db;
    } else {
      logger.info(`getting new db connection`);
      db = await establishConnection();
      return db;
    }
  } catch (e) {
    logger.error(e);
    return e;
  }
};

export { connect, db };

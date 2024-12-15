import express from "express";
import dotenv from "dotenv";
import routes from "./routes";
import connectDB from "./config/db";
import connectCloudinary from "./config/cloudinary";
import fileUpload from "express-fileupload";
import Cors from "cors";

dotenv.config();

const app = express();
connectDB();
connectCloudinary();
app.use(Cors());
app.use(express.json());
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );
app.use("/api" , routes)

export default app

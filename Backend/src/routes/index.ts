import { Router } from "express";
import { imageUpload } from "../controllers/imageUpload";

const router = Router();
router.post("/imageUpload", imageUpload);

export default router;
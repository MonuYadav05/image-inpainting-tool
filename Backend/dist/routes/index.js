"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const imageUpload_1 = require("../controllers/imageUpload");
const router = (0, express_1.Router)();
router.post("/imageUpload", imageUpload_1.imageUpload);
exports.default = router;

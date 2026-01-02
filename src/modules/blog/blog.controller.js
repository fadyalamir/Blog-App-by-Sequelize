import { Router } from "express";
import { blogList, createBlog } from "./services/blog.service.js";
const router = Router();

router.get("/", blogList);
router.post("/", createBlog);

export default router;
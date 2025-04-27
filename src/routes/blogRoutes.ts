import { Router } from "express";
import BlogController from "../controllers/blogController";

const router = Router();
const blogController = new BlogController();

router.get("/", blogController.getAllBlogs);
router.get("/:blogId", blogController.getOneBlogById);
router.post("/:blogId/update", blogController.updateBlog);
router.post("/", blogController.createBlogWithXPath);
router.post("/xpath", blogController.createBlogXPaths);
router.post("/xpath/update", blogController.updateBlogXPaths);

export default router;
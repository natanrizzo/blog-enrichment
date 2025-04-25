import { Router } from "express";
import { PostController } from "../controllers/postController";


const router = Router();
const postController = new PostController();


router.get("/:id", postController.getOnePostById);
router.get("/", postController.getAllPosts);
router.post("/:id/update", postController.updatePost);
router.post("/:id/summarize", postController.summarizePost);

export default router;
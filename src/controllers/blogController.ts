import { Request, Response } from "express";
import { BlogRepository } from "../repositories/blogRepository";
import { CreateXPathDTO } from "../dto/xPathDto";

export default class BlogController {
    private blogRepo: BlogRepository = new BlogRepository();

    getAllBlogs = async (req: Request, res: Response) => {
        const blogs = await this.blogRepo.getAllBlogs();
        res.json(blogs);
    }

    createBlogXPaths = async (req: Request, res: Response) => {
        const xPaths: CreateXPathDTO = req.body;
        const createdXPaths = await this.blogRepo.createBlogXPaths(xPaths);
        res.json(createdXPaths);
    }

    updateBlogXPaths = async (req: Request, res: Response) => {
        const xPaths:Partial<CreateXPathDTO> = req.body;
        const updatedXPaths = await this.blogRepo.updateBlogXPaths(xPaths);
        res.json(updatedXPaths);
    }
}
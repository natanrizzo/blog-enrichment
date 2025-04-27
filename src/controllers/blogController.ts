import { Request, Response } from "express";
import { BlogRepository } from "../repositories/blogRepository";
import { CreateXPathDTO } from "../dto/xPathDto";
import { BlogXPathDTO } from "../dto/blogXPathDto";

export default class BlogController {
    private blogRepo: BlogRepository = new BlogRepository();

    createBlogWithXPath = async(req: Request, res: Response) => {
        const blog: BlogXPathDTO = req.body.blog;
        const createdBlog = await this.blogRepo.createBlogWithXPath(blog);
        res.json(createdBlog);
    }

    getOneBlogById = async(req: Request, res: Response) => {
        const { blogId } = req.params;
        const blog = await this.blogRepo.getOneBlogById(Number(blogId));
        res.json(blog);
    }

    getAllBlogs = async (req: Request, res: Response) => {
        const blogs = await this.blogRepo.getAllBlogs();
        res.json(blogs);
    }

    updateBlog = async (req: Request, res: Response) => {
        const { blogId } = req.params;
        const blog: BlogXPathDTO = req.body.blog;
        const updatedBlog = await this.blogRepo.updateBlog(Number(blogId), blog);
        res.json(updatedBlog)
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
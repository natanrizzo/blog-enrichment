import PostRepository from "../repositories/postRepository";
import { Request, Response } from "express";
import AIService from "../services/aiService";

export class PostController {
    private repo : PostRepository = new PostRepository();
    private aiService = new AIService();

    getOnePostById = async (req: Request, res: Response) => {
        const { id } = req.params;
        
        const post = await this.repo.getOnePostById(Number(id));
        res.json(post);
    }

    getAllPosts = async (req: Request, res: Response) => {
        const posts = await this.repo.getAllPosts();
        console.log(posts);
        res.json(posts);
    }

    summarizePost = async (req: Request, res: Response) => {
        const { prompt } = req.body;
        const sumText = await this.aiService.summarizeText(prompt);
        res.json(sumText);
    }
}
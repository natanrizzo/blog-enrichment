import PostRepository from "../repositories/postRepository";
import { Request, Response } from "express";
import AIService from "../services/aiService";
import { PostData } from "../parsers/IParser";

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
        res.json(posts);
    }

    updatePost = async (req: Request, res: Response) => {
        const { id } = req.params;
        const postData = req.body;

        const updatedPost = await this.repo.updatePost(Number(id), postData);
        res.json(updatedPost);
    }

    summarizePost = async (req: Request, res: Response) => {
        const { model, text } = req.body;
        const sumText = await this.aiService.summarizeText(model, text);
        res.json(sumText);
    }
}
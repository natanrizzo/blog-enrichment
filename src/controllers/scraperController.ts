import { Request, Response } from "express";
import { BlogRepository } from "../repositories/blogRepository";
import { ScraperService } from "../services/scraperService";

export default class ScraperController {
    private scraperService: ScraperService = new ScraperService();
    runScrapper = async (req: Request, res: Response) => {
        const { baseUrl, platform } = req.body;
        this.scraperService.runScraper(baseUrl, platform);
    }
}
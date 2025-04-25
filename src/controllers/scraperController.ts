import { Request, Response } from "express";
import { ScraperService } from "../services/scraperService";

export default class ScraperController {
    private scraperService: ScraperService = new ScraperService();
    runScrapper = async (req: Request, res: Response) => {
        const { baseUrl, platform } = req.body;
        await this.scraperService.runScraper(baseUrl, platform);
        res.json({message: "Scraper finished."});
    }
}
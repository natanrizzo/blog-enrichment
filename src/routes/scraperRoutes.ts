import { Router } from "express";
import ScraperController from "../controllers/scraperController";

const router = Router();
const scraperController = new ScraperController();

router.post("/", scraperController.runScrapper);


export default router;
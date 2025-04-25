import { ScraperService } from "./services/scraperService";

async function main(): Promise<void> {
    const websiteBaseUrl = "https://www.manualdepericias.com.br/blog/";
    const platform = "wordpress";

    const scraperService = new ScraperService();

    await scraperService.runScraper(websiteBaseUrl, platform);

    console.log("Scraping done!");

}

main().catch(e => {
    console.error("Error while scraping:", e);
    process.exit(1);
});
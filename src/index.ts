import { ScraperService } from "./services/scraperService";

async function main(): Promise<void> {
    const websiteBaseUrl = "https://www.manualdepericias.com.br/blog/";
    const platform = "wordpress";

    const scraperService = new ScraperService();

    await scraperService.runScraper(websiteBaseUrl, platform);

    console.log("Scrapping finalizado!");

}

main().catch(e => {
    console.error("Erro no scraping:", e);
    process.exit(1);
});
import { ScraperService } from "./services/scraperService";
import readline from "readline";

function perguntar(rl: readline.Interface, pergunta: string): Promise<string> {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}

async function main(): Promise<void> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let websiteBaseUrl = await perguntar(rl, "Digite o url do site o qual queira coletar dados: ");
    if (!websiteBaseUrl) {
        websiteBaseUrl = "https://www.manualdepericias.com.br/blog/";
    }

    let platform = await perguntar(rl, "Digite a plataforma do website: (padrão wordpress) ");
    if (!platform) {
        platform = "wordpress";
    }

    rl.close();

    const scraperService = new ScraperService();
    await scraperService.runScraper(websiteBaseUrl, platform);

    console.log("Scraping done!");
}

main().catch(e => {
    console.error("Error while scraping:", e);
    process.exit(1);
});
import { create } from "domain";
import prisma from "./prisma/prisma";
import { ScrapperService } from "./services/scrapperService";
import { blogConfigs } from "./config/blogXPaths";
import { BlogRepository } from "./repositories/blogRepository";

async function main(): Promise<void> {
    const websiteBaseUrl = "https://www.manualdepericias.com.br/blog/";
    const platform = "wordpress";

    const blogRepo = new BlogRepository();

    const websiteBlog = await blogRepo.checkCreateBlog(websiteBaseUrl, platform);

    await new ScrapperService().runManual(websiteBlog.id, websiteBaseUrl);
    console.log("Scrapping finalizado!");

}

main().catch(e => {
    console.error("Erro no scraping:", e);
    process.exit(1);
});
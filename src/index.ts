import { ScraperService } from "./services/scraperService";
import { BlogRepository } from "./repositories/blogRepository";
import inquirer from "inquirer";

async function main(): Promise<void> {
    const blogRepo = new BlogRepository();
    const blogs = await blogRepo.getAllBlogs();

    if (!blogs.length) {
        console.log("❌ No blogs found in the database.");
        return;
    }

    const { selectedBlogUrl } = await inquirer.prompt([
        {
            type: "list",
            name: "selectedBlogUrl",
            message: "🌐 Choose the blog you want to scrape:",
            choices: blogs.map((blog) => ({
                name: blog.baseUrl,
                value: blog.baseUrl,
            })),
        }
    ]);

    const scraperService = new ScraperService();
    await scraperService.runScraper(selectedBlogUrl,selectedBlogUrl.platform);

    console.log("✅ Scraping done!");
}

main().catch(e => {
    console.error("Error while scraping:", e);
    process.exit(1);
});

import { blogConfigs } from "../config/blogXPaths";
import { SeleniumParser } from "../parsers/seleniumParser";
import { PostRepository } from "../repositories/postRepository";

export class ScrapperService {
    private parser = new SeleniumParser();
    private repo = new PostRepository();

    async runManual(websiteBlogId: number, websiteBaseUrl: string): Promise<void> {
        const hostname = new URL(websiteBaseUrl).hostname;
        console.log(hostname);
        const config = blogConfigs[hostname];
        console.log(config);
        const recordCountBefore = await this.repo.countPosts(websiteBlogId);

        await this.parser.init();

        let nextPageUrl: string | null = websiteBaseUrl + config.indexUrl;
        let pageCounter = 0;
        const allUrls: string[] = [];

        while (nextPageUrl && (config.paginationLimit ?? Infinity) > pageCounter) {
            await this.parser.fetchIndex(nextPageUrl, config);
            const pageUrls = await this.parser.parseIndex(config);
            allUrls.push(...pageUrls);

            nextPageUrl = await this.parser.parseNextPageUrl(config);
            pageCounter++;
        }

        const lastPublished = await this.repo.getLastPublishedAt(websiteBlogId);

        for (const itemUrl of allUrls) {
            await this.parser.fetchDetail(itemUrl);
            const data = await this.parser.parseDetail(config);
            console.log(data);

            if (!lastPublished || data.postPublishedAt > lastPublished) {
                await this.repo.upsert(websiteBlogId, data);
            }
        }

        const recordCounterAfter = await this.repo.countPosts(websiteBlogId);
        await this.repo.updateLastScraped(websiteBlogId, recordCounterAfter);

        await this.parser.close();
    }
}
import { SeleniumParser } from "../parsers/seleniumParser";
import { BlogRepository } from "../repositories/blogRepository";
import PostRepository from "../repositories/postRepository";

export class ScraperService {
    private parser = new SeleniumParser();
    private postRepo = new PostRepository();
    private blogRepo = new BlogRepository();

    async runManual(websiteBlogId: number, websiteBaseUrl: string): Promise<void> {
        console.log(websiteBaseUrl);
        const config = await this.blogRepo.getBlogXPaths(websiteBaseUrl);
        if (!config) {
            throw new Error(`❌ No config found for ${websiteBaseUrl}`);
        }

        console.log(`✅ Found config for blog: ${websiteBaseUrl} \n ${config}`);
        const recordCountBefore = await this.postRepo.countPosts(websiteBlogId);
        console.log(`📋 Initial posts in ${websiteBaseUrl}: ${recordCountBefore}`);

        await this.parser.init();

        let nextPageUrl: string | null = websiteBaseUrl;
        let pageCounter = 0;
        const allUrls: string[] = [];

        while (nextPageUrl && (config.paginationLimit ?? Infinity) > pageCounter) {
            console.log(`🔎 Searching indexes for ${nextPageUrl} ...`);
            await this.parser.fetchIndex(nextPageUrl, config);
            const pageUrls = await this.parser.parseIndex(config);
            allUrls.push(...pageUrls);

            nextPageUrl = await this.parser.parseNextPageUrl(config);
            pageCounter++;
        }
        console.log(`📋 ${allUrls.length} URLs founded`);

        const lastPublished = await this.postRepo.getLastPublishedAt(websiteBlogId);

        for (const itemUrl of allUrls) {
            console.log(`🔎 Fetching details from ${itemUrl}`);
            await this.parser.fetchDetail(itemUrl);
            const data = await this.parser.parseDetail(config);
            console.log(data);

            if (!lastPublished || data.postPublishedAt > lastPublished) {
                await this.postRepo.upsert(websiteBlogId, data);
            }
        }

        const recordCounterAfter = await this.postRepo.countPosts(websiteBlogId);
        await this.postRepo.updateLastScraped(websiteBlogId, recordCounterAfter);
        console.log(`✅ Got ${recordCounterAfter - recordCountBefore} new posts in this scrap.`);

        await this.parser.close();
    }

    async runScraper(websiteBaseUrl: string, platform: string) {
        const websiteBlog = await this.blogRepo.checkCreateBlog(websiteBaseUrl, platform);
        await this.runManual(websiteBlog.id, websiteBaseUrl);
    }
}
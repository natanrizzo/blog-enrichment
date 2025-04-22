import { Builder, By, until, WebDriver, WebElement } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import { SiteXPaths } from "../config/blogXPaths";
import { IParser, PostData } from "./IParser";
import { urlToId } from "../utils/urlToId";


export class SeleniumParser implements IParser {
    private driver!: WebDriver
    
    TIMEOUT: number = 10000;

    async init(): Promise<void> {
        const options = new chrome.Options();
        options.addArguments("--headless");
        options.addArguments("--no-sandbox");
        this.driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(options)
        .build();
    }

    async close(): Promise<void> {
        await this.driver.quit();
    }

    async fetchIndex(websiteBaseUrl: string, config: SiteXPaths): Promise<void> {
        const pageUrl = websiteBaseUrl + config.indexUrl;
        await this.driver.get(pageUrl);
        await this.driver.sleep(2000);
        await this.dismissPopup();
    }

    async parseIndex(config: SiteXPaths): Promise<string[]> {
        let elems: WebElement[] = []
        try {
            elems = await this.driver.findElements(By.xpath(config.itemXPath));
            console.log(`Found ${elems.length} elements for itemXPath: ${config.itemXPath}`);
        } catch (err) {
            console.warn("Couldn't find item", elems);
        }
        const urls: string[] = [];
        for (const el of elems) {
            try {
                const aHref = await el.getAttribute("href");
                if (aHref) {
                    urls.push(aHref);
                }
            } catch (err) {
                console.warn("Failed to extract href from element", err);
            }
        }
        return urls;
    }

    async parseNextPageUrl(config: SiteXPaths): Promise<string | null> {
        if (!config.paginationNextXPath) {
            return null;
        }

        try {
            const nextEl = await this.driver.wait(
                until.elementLocated(
                    By.xpath(config.paginationNextXPath)), 
                    this.TIMEOUT
            );
            const nextHref = await nextEl.getAttribute("href");
            return nextHref;
        } catch {
            return null;
        }
    }

    async fetchDetail(itemUrl: string): Promise<void> {
        await this.driver.get(itemUrl);
        await this.driver.sleep(2000);
    }
    async parseDetail(config: SiteXPaths): Promise<PostData> {
        let postTitle = "";
        let postContent = "";
        let postAuthor = "";
        let postPublishedAt = new Date();
        
        try {
            const titleEl = await this.driver.wait(until.elementLocated(By.xpath(config.titleXPath)), this.TIMEOUT);
            postTitle = await titleEl.getText();
        } catch (err) {
            console.warn("Title element not found:", err);
        }
        
        try {
            const contentEl: WebElement[] = await this.driver.findElements(By.xpath(config.contentXPath));
            for (const content of contentEl) {
                const text = await content.getText();
                postContent += text;
            }

        } catch (err) {
            console.warn("Content element not found:", err);
        }
        
        try {
            const authorEl = await this.driver.wait(until.elementLocated(By.xpath(config.authorXPath)), this.TIMEOUT);
            postAuthor = await authorEl.getText();
        } catch (err) {
            console.warn("Author element not found:", err);
        }
        

        try {
            const dateEl = await this.driver.findElement(By.xpath(config.dateXPath));
            const dateAttr = await dateEl.getAttribute("datetime");
            const dateText = dateAttr || await dateEl.getText();
            postPublishedAt = new Date(dateText);
        } catch (err) {
            console.warn("Date element not found:", err);
        }
        
        const currentUrl = await this.driver.getCurrentUrl();
        const postExternalId = urlToId(currentUrl);

        return {
            postExternalId,
            postTitle,
            postContent,
            postAuthor,
            postPublishedAt
        } as PostData;
    }

    async dismissPopup(): Promise<void> {
        try {
            const closeBtn = await this.driver.wait(
                until.elementLocated(By.xpath("div[contains(@class, 'modal-close')]")),
                5000
            );
            await closeBtn.click();
            console.log("Popup closed");
        } catch(err) {
            console.log("No popup detected.");
        }
    }
}
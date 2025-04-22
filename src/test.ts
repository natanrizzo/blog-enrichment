import { Builder, By, until, WebElement } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

async function scrape() {
    const options = new chrome.Options();
    options.addArguments("--headless");
    const driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

    try {
    await driver.get("https://www.manualdepericias.com.br/blog/");

    await driver.sleep(2000);
    const element = await driver.wait(until.elementLocated(By.xpath('//h1[contains(@class, "entry-title")]/a')), 10000);
    const text = await element.getAttribute("href");
    console.log('href:', text);
    const next = await driver.findElement(By.xpath("//a[contains(@class, 'next page-numbers')]"));
    const nextHref = await next.getAttribute("href");
    console.log(nextHref);
    await driver.get(text);
    await driver.sleep(2000);
    const el = await driver.wait(until.elementLocated(By.xpath("//h1[contains(@class, 'entry-title')]")), 10000);
    const t = await el.getText();
    console.log("title:", t);

    const contEl: WebElement[] = await driver.findElements(By.xpath('//div[@class="post_content"]//p | //div[@class="post_content"]//ul | //div[@class="post_content"]//ol'));
    let content = ""
    for (const el of contEl) {
        const text = await el.getAttribute("innerHTML");
        content += text;
    }
    console.log(content);
    } finally {
        await driver.quit();
    }
}

scrape();
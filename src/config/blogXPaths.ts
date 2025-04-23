export interface SiteXPaths {
    indexUrl: string;
    itemXPath: string;
    titleXPath: string;
    contentXPath: string;
    authorXPath: string;
    dateXPath: string;
    paginationNextXPath?: string;
    paginationLimit?: number;
}

/*export const blogConfigs: Record<string, SiteXPaths> = {
    "www.manualdepericias.com.br": {
        indexUrl: "/blog/",
        itemXPath: "//h1[contains(@class, 'entry-title')]/a",
        paginationNextXPath: "//a[contains(@class, 'next page-numbers')]",
        titleXPath: "//h1[contains(@class, 'entry-title')]",
        contentXPath: "//div[@class='post_content']//p | //div[@class='post_content']//ul | //div[@class='post_content']//ol",
        authorXPath: "//div[contains(@class, 'about_author_inner')]/h5",
        dateXPath: "//time[contains(@class, 'entry-date published')]",
        paginationLimit: 3
    },
    "blog.manole.com.br": {
        indexUrl: "/",
        itemXPath: "//div[contains(@class,'post-item')]",
        titleXPath: ".//h3/a",
        contentXPath: ".//div[contains(@class,'content-summary')]",
        authorXPath: ".//span[@class='meta-author']/a",
        dateXPath: ".//time",
        paginationNextXPath: "//a[contains(text(),'Próxima')]",
        paginationLimit: 5,
    },
}*/
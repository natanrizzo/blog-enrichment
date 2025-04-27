import { SiteXPaths } from "../config/blogXPaths";

export interface PostData {
    postExternalId: string;
    postTitle: string;
    postContent: string;
    postAuthor: string;
    postPublishedAt: string;
    postExtraData?: any;
}

export interface IParser {
    init(): Promise<void>;
    close(): Promise<void>;
    fetchIndex(websiteBaseUrl: string, config: SiteXPaths): Promise<void>;
    parseIndex(config: SiteXPaths): Promise<string[]>;
    parseNextPageUrl?(config: SiteXPaths): Promise<string | null>;
    fetchDetail(itemUrl: string): Promise<void>;
    parseDetail(config: SiteXPaths): Promise<PostData>;
    dismissPopup(): Promise<void>;
}
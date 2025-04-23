import { CreateXPathDTO } from "../dto/xPathDto";
import { Blog, XPathConfig } from "../generated/prisma";
import prisma from "../prisma/prisma";

export class BlogRepository {
    async checkCreateBlog(websiteBaseUrl: string, platform: string = "wordpress"): Promise<Blog> {
        return await prisma.blog.upsert({
            where: {
                baseUrl: websiteBaseUrl,
            },
            create: {
                baseUrl: websiteBaseUrl,
                platform: platform,
            },
            update: {},
        });
    }

    async getAllBlogs(): Promise<Blog[]> {
        return await prisma.blog.findMany({
            include: {
                xPath: true
            }
        });
    }

    async createBlogXPaths(xpaths: CreateXPathDTO): Promise<XPathConfig> {
        const blog = await prisma.blog.findUnique({
            where: { baseUrl: xpaths.blogUrl }
        });
        if (!blog) {
            throw new Error("Blog not found");
        }
        
        const createdXPathConfig = await prisma.xPathConfig.create({
            data: {
                indexUrl: xpaths.indexUrl,
                itemXPath: xpaths.itemXPath,
                paginationNextXPath: xpaths.paginationNextXPath,
                titleXPath: xpaths.titleXPath,
                contentXPath: xpaths.contentXPath,
                authorXPath: xpaths.authorXPath,
                dateXPath: xpaths.dateXPath,
                paginationLimit: xpaths.paginationLimit,
                blog: {
                    connect: { id: blog.id }
                },
            },
        });
        
        return createdXPathConfig;
    }

    async getBlogXPaths(hostname: string): Promise<XPathConfig | null> {
        const blog = await prisma.blog.findUnique({
            where: { baseUrl: hostname },
            include: {
                xPath: true
            }
        });
        return blog?.xPath ?? null;
    }

    async updateBlogXPaths(xPaths: Partial<CreateXPathDTO>): Promise<XPathConfig> {
        const blog = await prisma.blog.findUnique({
            where: { baseUrl: xPaths.blogUrl },
            include: {
                xPath: true 
            },
        });

        if (!blog?.xPath) {
            throw new Error("No XPath Config for that blog");
        }

        const updated = await prisma.xPathConfig.update({
            where: { id: blog.xPath.id },
            data: xPaths
        });

        return updated;
    }
}
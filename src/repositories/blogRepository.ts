import { Blog } from "../generated/prisma";
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
}
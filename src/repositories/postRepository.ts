import { PostData } from "../parsers/IParser";
import prisma from "../prisma/prisma";

export class PostRepository {
    async upsert(websiteBlogId: number, data: PostData): Promise<void> {
        await prisma.post.upsert({
            where: {
                blogId_externalId: {
                    blogId: websiteBlogId,
                    externalId: data.postExternalId,
                },
            },
            create: {
                blogId: websiteBlogId,
                externalId: data.postExternalId,
                author: data.postAuthor,
                content: data.postContent,
                publishedAt: data.postPublishedAt,
                title: data.postTitle,
                extraData: data.postExtraData
            },
            update: this.mapPostData(data)
        });
    }

    mapPostData = (data: PostData) => {
        return {
            title: data.postTitle,
            externalId: data.postExternalId,
            content: data.postContent,
            author: data.postAuthor,
            publishedAt: data.postPublishedAt,
            extraData: data.postExtraData
        }
    }

    async getLastPublishedAt(websiteBlogId: number): Promise<Date | null> {
        const last = await prisma.post.findFirst({
            where: { blogId: websiteBlogId },
            orderBy: { publishedAt: "desc" },
        });

        return await last?.publishedAt ?? null;
    }

    async countPosts(websiteBlogId: number): Promise<number> {
        return await prisma.post.count({ where: { blogId: websiteBlogId } });
    }

    async updateLastScraped(websiteBlogId: number, recordCounterAfter: number): Promise<void> {
        await prisma.blog.update({
            where: { id: websiteBlogId },
            data: {
                totalPosts: recordCounterAfter,
                lastScrapedAt: new Date(),
            },
        });
    }
}
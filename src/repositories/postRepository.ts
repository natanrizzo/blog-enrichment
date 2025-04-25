import { Post } from "../generated/prisma";
import { PostData } from "../parsers/IParser";
import prisma from "../prisma/prisma";

export default class PostRepository {
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

    async getOnePostById(postId: number): Promise<Post | null> {
        const post = await prisma.post.findFirst({
            where: {
                id: postId
            }
        });
        return post;
    }

    async getAllPosts(): Promise<Post[]> {
        const posts = await prisma.post.findMany();
        return posts;
    }

    async updatePost(postId: number, postData: PostData): Promise<Post> {
        const postFormated = this.mapPostData(postData);
        
        const post = await prisma.post.update({
            where: {
                id: postId
            },
            data: postFormated
        });

        return post;
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
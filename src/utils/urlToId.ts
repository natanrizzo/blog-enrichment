export function urlToId(itemUrl: string): string {
    const pathname = new URL(itemUrl).pathname;
    const parts = pathname.split("/").filter(Boolean);
    return parts.length ? parts.pop()! : itemUrl;
}
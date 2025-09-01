type Article = {
    title: string;
    urlToImage: string | null;
    publishedAt: string;
    source: { name: string };
    author?: string;
    description?: string;
    url: string;
    content?: string;
};

export type {Article};
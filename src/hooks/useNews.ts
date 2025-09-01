import { useState, useEffect, useCallback } from "react";
import { getTopHeadlines } from "../api/newsApi";

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

const PAGE_SIZE = 10;

export function useNews() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    // фильтры
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState<string | undefined>();

    const fetchNews = useCallback(
        async (reset = false) => {
            if (loading) return;
            if (reset) setRefreshing(true);
            else setLoading(true);

            try {
                const data = await getTopHeadlines(
                    reset ? 1 : page,
                    PAGE_SIZE,
                    category,
                    query
                );

                if (reset) {
                    setArticles(data.articles);
                    setPage(2);
                } else {
                    setArticles(prev => [...prev, ...data.articles]);
                    setPage(prev => prev + 1);
                }

                setHasMore(data.totalResults > PAGE_SIZE * (reset ? 1 : page));
            } catch (err) {
                setError("Ошибка загрузки новостей");
            } finally {
                setLoading(false);
                setRefreshing(false);
            }
        },
        [page, category, query, loading]
    );

    const refresh = useCallback(() => {
        setPage(1);
        fetchNews(true);
    }, [category, query, fetchNews]);

    useEffect(() => {
        refresh();
    }, [category, query]);

    return {
        articles,
        loading,
        refreshing,
        error,
        hasMore,
        fetchNews,
        refresh,
        setQuery,
        setCategory,
    };
}

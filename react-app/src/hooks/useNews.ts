import { useState, useEffect } from 'react';

export interface NewsItem {
  title: string;
  date: string;
  description: string;
  image: string;
}

export const useNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const response = await fetch('/json/news.json');
        if (!response.ok) {
          throw new Error('Помилка при завантаженні новин');
        }
        const data = await response.json();
        setNews(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return { news, loading, error };
};

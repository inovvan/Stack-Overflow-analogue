import { useState, useEffect, useCallback, RefObject, useRef } from 'react';

interface InfiniteScrollOptions {
  threshold?: number;
  rootMargin?: string;
}

interface InfiniteScrollResult {
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  page: number;
  sentinelRef: RefObject<HTMLDivElement>;
}

const useInfiniteScroll = <T,>(
  fetchMoreData: (page: number) => Promise<T[]>,
  options: InfiniteScrollOptions = {}
): InfiniteScrollResult => {
  const { threshold = 0.1, rootMargin = '100px' } = options;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const newData = await fetchMoreData(page + 1);
      if (newData.length === 0) {
        setHasMore(false);
      }
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [fetchMoreData, isLoading, hasMore, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [loadMore, hasMore, isLoading, threshold, rootMargin]);

  return { isLoading, error, hasMore, page, sentinelRef };
};

export default useInfiniteScroll;
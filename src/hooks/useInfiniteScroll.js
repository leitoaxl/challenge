import { useEffect, useState, useCallback } from "react";

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 100 ||
      isFetching ||
      document.documentElement.scrollTop < 100
    ) {
      return;
    }
    setIsFetching(true);
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const fetchMore = async () => {
      await callback();
      setIsFetching(false);
    };

    if (isFetching) {
      fetchMore();
    }
  }, [isFetching, callback]);

  return setIsFetching; 
};

export default useInfiniteScroll;

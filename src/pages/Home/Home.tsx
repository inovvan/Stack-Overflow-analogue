import React, { useState } from "react";
import * as styles from "./Home.module.scss";
import Snippet from "@/components/ui/Snippet";
import { getSnippetsByPage } from "@/services/snippetsApi";
import SnippetType from "@/types/Snippet";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

const Home: React.FC = () => {
  const [snippets, setSnippets] = useState<SnippetType[]>([]);

  const { isLoading, error, sentinelRef } = useInfiniteScroll<SnippetType>(
    async (page) => {
      const newSnippets = await getSnippetsByPage(page);
      setSnippets((prev) => (prev ? [...prev, ...newSnippets] : newSnippets));
      return newSnippets;
    },
    {
      threshold: 0.1,
      rootMargin: "400px",
    }
  );

  return (
    <div className={styles["home"]}>
      {snippets.length !== 0 &&
        snippets.map((snippet) => {
          console.log(snippet.language);
          return <Snippet key={snippet.id} {...snippet} />;
        })}
      <div ref={sentinelRef} />
      {isLoading && <p className={styles["home__loading"]}>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Home;

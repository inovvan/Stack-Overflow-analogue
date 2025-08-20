import React, { useContext, useState } from "react";
import * as styles from "./Home.module.scss";
import Snippet from "@/components/ui/Snippet";
import { getSnippetsByPage } from "@/services/snippetsApi";
import { SnippetType, SnippetResponseType, mapSnippet } from "@/types/Snippet";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { AuthContext } from "@/context/AuthContext";

const Home: React.FC = () => {
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const { user } = useContext(AuthContext);
  const { isLoading, error, sentinelRef } = useInfiniteScroll<SnippetType>(
    async (page) => {
      const newSnippetsResponse = await getSnippetsByPage(page);
      const newSnippets =  newSnippetsResponse.map(Snippet => mapSnippet(Snippet, user));
      setSnippets((prev) => [...prev, ...newSnippets]);
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
          return <Snippet key={snippet.id} {...snippet} />;
        })}
      <div ref={sentinelRef} />
      {isLoading && <p className={styles["home__loading"]}>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Home;

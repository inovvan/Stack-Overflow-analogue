import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import * as styles from "./UserSnippets.module.scss";
import Snippet from "@/components/ui/Snippet";
import { getSnippetsByUserId } from "@/services/snippetsApi";
import { mapSnippet, SnippetType } from "@/types/Snippet";

const UserSnippets: React.FC = () => {
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user, status } = useContext(AuthContext);

  useEffect(() => {
    if (status === "unauthenticated") return;

    setIsLoading(true);

    getSnippetsByUserId(user.id)
      .then((data) => {
        setSnippets(data.map(snippet => mapSnippet(snippet, user)));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch snippets:", error);
        setIsLoading(false);
      });
  }, []);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className={styles["user-snippets"]}>
      {snippets &&
        snippets.map((snippet) => {
          return <Snippet key={snippet.id} {...snippet} />;
        })}
      {isLoading && (
        <p className={styles["user-snippets__message"]}>Loading...</p>
      )}
      {(snippets.length === 0 && !isLoading) && (
        <p className={styles["user-snippets__message"]}>
          You don't have shippets yet.
        </p>
      )}
    </div>
  );
};

export default UserSnippets;

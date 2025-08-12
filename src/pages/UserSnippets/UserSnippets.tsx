import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import * as styles from "./UserSnippets.module.scss";
import Snippet from "@/components/ui/Snippet";
import { getSnippetsByUserId } from "@/services/snippetsApi";
import SnippetType from "@/types/Snippet";

const UserSnippets: React.FC = () => {
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [isLoading, setIsLodaing] = useState<boolean>(false);
  const { user, status } = useContext(AuthContext);

  useEffect(() => {
    if (status === "unauthenticated") return;

    setIsLodaing(true);

    getSnippetsByUserId(user.id)
      .then((data) => {
        setSnippets(data);
        setIsLodaing(false);
      })
      .catch((error) => {
        console.error("Failed to fetch snippets:", error);
        setIsLodaing(false);
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

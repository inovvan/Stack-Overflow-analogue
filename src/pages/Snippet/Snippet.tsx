import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import * as styles from "./Snippet.module.scss";
import SnippetComponent from "@/components/ui/Snippet";
import SnippetType from "@/types/Snippet";
import { addComment, getSnippetById } from "@/services/snippetsApi";
import { TextField } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import IconButton from "@mui/material/IconButton";

const Snippet: React.FC = () => {
  const { id } = useParams();
  const [snippet, setSnippet] = useState<SnippetType | undefined>(undefined);
  const [isLoading, setIsLodading] = useState(true);
  const [commentText, setCommentText] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getSnippetById(id)
      .then((data: SnippetType) => {
        setSnippet(data);
        setIsLodading(false);
      })
      .catch((err) => {
        console.error("Error fetching snippet:", err);
      });
  }, []);

  const handleCommentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentText(event.target.value);
    setError("");
  };

  const handleSendComment = () => {
    addComment(commentText, snippet.id)
      .then((comment) => {
        setSnippet({ ...snippet, comments: [...snippet.comments, comment] });
        setCommentText("");
      })
      .catch((err) => {
        setError(err.response.data.errors[0].failures[0]);
      });
  };

  return (
    <div className={styles["snippet"]}>
      {isLoading ? (
        <p className={styles["snippet__loading"]}>Loading...</p>
      ) : (
        snippet && (
          <div>
            <SnippetComponent {...snippet} />
            <ul>
              {snippet.comments.map((comment) => (
                <li
                  key={comment.id}
                  className={styles["snippet__comment-container"]}
                >
                  <span className={styles["snippet__comment-text"]}>
                    {comment.content}
                  </span>
                  <div className={styles["snippet__comment-author"]}>
                    By {comment.user.username}
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles["snippet__add-comment-container"]}>
              <TextField
                multiline
                rows={4}
                variant="filled"
                label="Add a comment"
                fullWidth
                value={commentText}
                onChange={handleCommentInput}
                error={Boolean(error)}
                helperText={error}
              />
              <IconButton onClick={handleSendComment} color="success">
                <MessageIcon fontSize="large" />
              </IconButton>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Snippet;

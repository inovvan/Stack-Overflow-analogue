import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import * as styles from "./Snippet.module.scss";
import { NavLink } from "react-router-dom";
import { SnippetType } from "@/types/Snippet";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { go } from "@codemirror/lang-go";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import UserIcon from "@/assets/icons/user.svg";
import CodeIcon from "@/assets/icons/code.svg";
import { IconButton } from "@mui/material";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import { setSnippetMark } from "@/services/snippetsApi";
import EditDocumentIcon from "@mui/icons-material/EditDocument";

const languageExtensions: Record<string, any> = {
  JavaScript: javascript({ jsx: true }),
  Python: python(),
  Java: java(),
  "C/C++": cpp(),
  Go: go(),
  Ruby: java(),
};

const Snippet: React.FC<SnippetType> = ({
  id,
  code,
  language,
  likes,
  dislikes,
  liked,
  disliked,
  user,
  comments,
}) => {
  const { user: authUser } = useContext(AuthContext);

  const [likeAmount, setLikeAmount] = useState<number>(likes);
  const [dislikeAmount, setDislikeAmount] = useState<number>(dislikes);
  const [isLiked, setIsLiked] = useState<boolean>(liked);
  const [isDisliked, setIsDisliked] = useState<boolean>(disliked);

  const reactions = {
    'like': {
      amount: likeAmount,
      setAmount: setLikeAmount,
      reacted: isLiked,
      setReacted: setIsLiked
    },
     'dislike': {
      amount: dislikeAmount,
      setAmount: setDislikeAmount,
      reacted: isDisliked,
      setReacted: setIsDisliked
    },
  }

   const handleReaction = (reaction: "like" | "dislike") => () => {
    const oppositeReaction = (reaction === "like" ? "dislike" : "like");
    if (reactions[reaction].reacted) {
      reactions[reaction].setReacted(false);
      reactions[reaction].setAmount((prev) => prev - 1);
      setSnippetMark(id, "none");
    } else {
      reactions[reaction].setReacted(true);
      reactions[reaction].setAmount((prev) => prev + 1);
      if (reactions[oppositeReaction].reacted) {
        reactions[oppositeReaction].setReacted(false);
        reactions[oppositeReaction].setAmount((prev) => prev - 1);
      }
      setSnippetMark(id, reaction);
    }
  };

  const handleEdit = (e: React.MouseEvent) => !authUser && e.preventDefault();

  return (
    <div className={styles["snippet"]}>
      <div className={styles["snippet__header"]}>
        <div>
          <UserIcon />
          <p>{user.username}</p>
        </div>
        <div>
          <CodeIcon />
          <p>{language}</p>
        </div>
      </div>
      <CodeMirror
        height="250px"
        editable={false}
        value={code}
        extensions={[languageExtensions[language]]}
        className={styles["snippet__code"]}
      />
      <div className={styles["snippet__footer"]}>
        <div>
          <span>{likeAmount}</span>
          <IconButton
            disabled={!authUser}
            onClick={handleReaction("like")}
            color={isLiked ? "success" : "inherit"}
          >
            <ThumbUpAltOutlinedIcon />
          </IconButton>

          <span>{dislikeAmount}</span>
          <IconButton
            disabled={!authUser}
            onClick={handleReaction("dislike")}
            color={isDisliked ? "error" : "inherit"}
          >
            <ThumbDownAltOutlinedIcon />
          </IconButton>
        </div>
        <div>
          {authUser?.id === user.id && <NavLink
            to={`/edit-snippet/${id}`}
            onClick={handleEdit}
          >
            <IconButton disabled={!authUser} color="inherit">
              <EditDocumentIcon />
            </IconButton>
          </NavLink>}

          <NavLink
            to={`/snippet/${id}`}
          >
            <span>{comments.length}</span>
            <IconButton color="inherit">
              <CommentOutlinedIcon />
            </IconButton>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Snippet;

import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import * as styles from "./Snippet.module.scss";
import { NavLink } from "react-router-dom";
import Snippet from "@/types/Snippet";
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

const Snippet: React.FC<Snippet> = ({
  id,
  code,
  language,
  marks,
  user,
  comments,
}) => {
  const { user: authUser } = useContext(AuthContext);

  const [likeAmount, setLikeAmount] = useState<number>(
    marks.filter((mark) => mark.type === "like").length
  );
  const [dislikeAmount, setDislikeAmount] = useState<number>(
    marks.filter((mark) => mark.type === "dislike").length
  );
  const [isLiked, setIsLiked] = useState<boolean>((): boolean => {
    if (!authUser) {
      return false;
    } else {
      return marks.some(
        (mark) => mark.type === "like" && mark.user.id === authUser.id
      );
    }
  });
  const [isDisliked, setIsDisliked] = useState<boolean>((): boolean => {
    if (!authUser) {
      return false;
    } else {
      return marks.some(
        (mark) => mark.type === "dislike" && mark.user.id === authUser.id
      );
    }
  });

  const handleLike = () => {
    if (isLiked) {
      setIsLiked(false);
      setLikeAmount((prev) => prev - 1);
      setSnippetMark(id, "none");
    } else {
      setIsLiked(true);
      setLikeAmount((prev) => prev + 1);
      if (isDisliked) {
        setIsDisliked(false);
        setDislikeAmount((prev) => prev - 1);
      }
      setSnippetMark(id, "like");
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setIsDisliked(false);
      setDislikeAmount((prev) => prev - 1);
      setSnippetMark(id, "none");
    } else {
      setIsDisliked(true);
      setDislikeAmount((prev) => prev + 1);
      if (isLiked) {
        setIsLiked(false);
        setLikeAmount((prev) => prev - 1);
      }
      setSnippetMark(id, "dislike");
    }
  };

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
            onClick={handleLike}
            color={isLiked ? "success" : "inherit"}
          >
            <ThumbUpAltOutlinedIcon />
          </IconButton>

          <span>{dislikeAmount}</span>
          <IconButton
            disabled={!authUser}
            onClick={handleDislike}
            color={isDisliked ? "error" : "inherit"}
          >
            <ThumbDownAltOutlinedIcon />
          </IconButton>
        </div>
        <div>
          {authUser?.id === user.id && <NavLink
            to={`/edit-snippet/${id}`}
            onClick={(e) => !authUser && e.preventDefault()}
          >
            <IconButton disabled={!authUser} color="inherit">
              <EditDocumentIcon />
            </IconButton>
          </NavLink>}

          <NavLink
            to={`/snippet/${id}`}
            onClick={(e) => !authUser && e.preventDefault()}
          >
            <span>{comments.length}</span>
            <IconButton disabled={!authUser} color="inherit">
              <CommentOutlinedIcon />
            </IconButton>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Snippet;

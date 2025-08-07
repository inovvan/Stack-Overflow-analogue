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

const languageExtensions: Record<string, any> = {
  JavaScript: javascript({ jsx: true }),
  Python: python(),
  Java: java(),
  'C/C++': cpp(),
  Go: go(),
  Ruby: java()
};

const Snippet: React.FC<Snippet> = ({ code, language, marks, user, comments }) => {
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
        height="200px"
        editable={false}
        value={code}
        extensions={[languageExtensions[language]]}
        className={styles['snippet__code']}
      />
      <div className={styles["snippet__footer"]}>
        <div>
          <span>{marks.filter(mark => mark.type === 'like').length}</span>
          <IconButton color="inherit">
            <ThumbUpAltOutlinedIcon/>
          </IconButton>

          <span>{marks.filter(mark => mark.type === 'dislike').length}</span>
          <IconButton color="inherit">
            <ThumbDownAltOutlinedIcon/>
          </IconButton>
        </div>
        <div>
          <span>{comments.length}</span>
          <IconButton color="inherit">
            <CommentOutlinedIcon/>
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Snippet;

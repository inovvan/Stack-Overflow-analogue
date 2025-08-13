import { useContext } from "react";
import * as styles from "./Question.module.scss";
import Question from "@/types/Question";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { AuthContext } from "@/context/AuthContext";
import EditDocumentIcon from "@mui/icons-material/EditDocument";

const Question: React.FC<Question> = ({
  id,
  title,
  description,
  answers,
  user,
  isResolved,
}) => {

  const { user: authUser } = useContext(AuthContext);

  return (
    <div className={styles["question"]}>
      <div className={styles["question__header"]}>
        <div className={styles["question__info-wrapper"]}>
          <HelpOutlineIcon color={isResolved ? "success" : "warning"} />
          <div className={styles["question__info-title"]}>
            <h3>{title}</h3>
            <p>Asked by user: {user.username}</p>
          </div>
        </div>
        <p className={styles["question__info-status"]}>
          {isResolved ? "Resolved" : "Unresolved"}
        </p>
      </div>
      <p className={styles["question__description"]}>{description}</p>
      <div className={styles["question__buttons-wrapper"]}>
        <NavLink
          to={`/question/${id}`}
        >
          <IconButton>
            <VisibilityIcon color="primary" />
          </IconButton>
        </NavLink>
        {authUser?.id === user.id && <NavLink to={`/edit-question/${id}`}>
            <IconButton disabled={!authUser} color="inherit">
              <EditDocumentIcon />
            </IconButton>
          </NavLink>}
      </div>
    </div>
  );
};

export default Question;

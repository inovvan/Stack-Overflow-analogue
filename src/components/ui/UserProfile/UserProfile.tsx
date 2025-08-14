import * as styles from "./UserProfile.module.scss";
import { useState, useEffect } from "react";
import UserStatistic from "@/types/UserStatistic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { deleteUser } from "@/services/userApi";
import { SnackbarContext } from "@/context/SnackbarContext";

const UserProfile: React.FC<UserStatistic> = (user) => {
  const location = useLocation();
  const isProfile = location.pathname.includes("my-profile");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { logout, setUser, setStatus } = useContext(AuthContext);
  const { handleSnackbarOpen } = useContext(SnackbarContext);

  const handleLogout = async (): Promise<void> => {
    await logout().catch((err) => {
      console.error(err);
      handleSnackbarOpen();
    });
  };

  const handleDelete = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConfirmDelete = async () => {
    await deleteUser()
      .then(async () => {
        setUser(undefined);
        setStatus("unauthenticated");
      })
      .catch((err) => {
        console.error(err);
        handleSnackbarOpen();
      });
    setIsOpen(false);
  };

  return (
    <div className={styles["user-profile"]}>
      <div className={styles["user-profile__info"]}>
        <AccountCircleIcon className={styles["user-profile__avatar-image"]} />
        <div className={styles["user-profile__info-wrapper"]}>
          <div>
            <p className={styles["user-profile__info-text--name"]}>
              {user.username}
            </p>
            <p className={styles["user-profile__info-text--info"]}>
              Id: {user.id}
            </p>
            <p className={styles["user-profile__info-text--info"]}>
              Role: {user.role}
            </p>
          </div>
          {isProfile && (
            <div className={styles["user-profile__buttons-wrapper"]}>
              <Button
                onClick={handleLogout}
                variant="contained"
                color="warning"
              >
                <LogoutIcon />
              </Button>
              <Button onClick={handleDelete} variant="contained" color="error">
                <DeleteIcon />
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className={styles["user-profile__statistics"]}>
        <p>
          <span>Rating:</span> {user.statistic.rating}
        </p>
        <p>
          <span>Snippets count:</span> {user.statistic.snippetsCount}
        </p>
        <p>
          <span>Comments count:</span> {user.statistic.commentsCount}
        </p>
        <p>
          <span>Likes count:</span> {user.statistic.likesCount}
        </p>
        <p>
          <span>Dislikes count:</span> {user.statistic.dislikesCount}
        </p>
        <p>
          <span>Questions count:</span> {user.statistic.questionsCount}
        </p>
        <p>
          <span>Correct answers count:</span>{" "}
          {user.statistic.correctAnswersCount}
        </p>
        <p>
          <span>Regular answers count:</span>{" "}
          {user.statistic.regularAnswersCount}
        </p>
      </div>
      <ConfirmDialog
        title="Confirm delete"
        content="Are you sure?"
        isOpen={isOpen}
        handleClose={handleClose}
        handleConfrim={handleConfirmDelete}
      />
    </div>
  );
};

export default UserProfile;

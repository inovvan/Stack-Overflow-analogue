import * as styles from "./Profile.module.scss";
import { useState, useEffect, useContext } from "react";
import UserProfile from "@/components/ui/UserProfile";
import UserStatistic from "@/types/UserStatistic";
import { getUserStatistic } from "@/services/userApi";
import { AuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import EditProfileForms from "@/components/ui/EditProfileForms";
import { SnackbarContext } from "@/context/SnackbarContext";

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserStatistic | undefined>(undefined);
  const { user: userAuth } = useContext(AuthContext);
  const { handleSnackbarOpen } = useContext(SnackbarContext);
  useEffect(() => {
    if (!userAuth) return;

    getUserStatistic(userAuth.id)
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        handleSnackbarOpen();
      });
  }, []);

  if (!userAuth) return <Navigate to="/login" />;

  return (
    <div className={styles["profile"]}>
      {isLoading ? (
        <p className={styles["profile__loading"]}>Loading...</p>
      ) : (
        <>
          <UserProfile {...user} />
          <EditProfileForms setUser={setUser} />
        </>
      )}
    </div>
  );
};

export default Profile;

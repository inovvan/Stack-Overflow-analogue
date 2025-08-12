import * as styles from "./Profile.module.scss";
import { useState, useEffect, useContext } from "react";
import UserProfile from "@/components/ui/UserProfile";
import UserStatistic from "@/types/UserStatistic";
import { getUserStatistic } from "@/services/userApi";
import { AuthContext } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import EditProfileForms from "@/components/ui/EditProfileForms";

const Profile: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<UserStatistic | undefined>(undefined);
  const { user: userAuth } = useContext(AuthContext);

  useEffect(() => {
    if (!userAuth) return;

    setIsLoading(true);
    getUserStatistic(userAuth.id)
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  if (!userAuth) return <Navigate to="/login" />;

  return (
    <div className={styles["profile"]}>
      {isLoading ? (
        <p className={styles["profile__loading"]}>Loading...</p>
      ) : (
        user && (
          <>
            <UserProfile {...user} />
            <EditProfileForms setUser={setUser} />
          </>
        )
      )}
    </div>
  );
};

export default Profile;

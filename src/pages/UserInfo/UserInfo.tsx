import * as styles from "./UserInfo.module.scss";
import { useState, useEffect, useContext } from "react";
import UserProfile from "@/components/ui/UserProfile";
import UserStatistic from "@/types/UserStatistic";
import { getUserStatistic } from "@/services/userApi";
import { useParams } from "react-router-dom";

const UserInfo: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserStatistic | undefined>(undefined);
  const { id } = useParams();

  useEffect(() => {
    getUserStatistic(id)
      .then((data) => {
        setUser(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div className={styles["user-info"]}>
      {isLoading ? (
        <p className={styles["user-info__loading"]}>Loading...</p>
      ) : (
        <>
          <UserProfile {...user} />
        </>
      )}
    </div>
  );
};

export default UserInfo;

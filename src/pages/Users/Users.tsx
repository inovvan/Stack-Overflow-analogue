import { useEffect, useState, useContext } from "react";
import * as styles from "./Users.module.scss";
import User from "@/types/User";
import { getUsers } from "@/services/userApi";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import { SnackbarContext } from "@/context/SnackbarContext";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
 const { handleSnackbarOpen } = useContext(SnackbarContext);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        handleSnackbarOpen();
      });
  }, []);

  return (
    <div className={styles["users"]}>
      {isLoading ? (
        <p className={styles["users__loading"]}>Loading...</p>
      ) : (
        <>
          {users.map((user) => {
            return (
              <div key={user.id} className={styles["users__user-card"]}>
                <div className={styles["users__user-card-info"]}>
                  <p>Username: {user.username}</p>
                  <p>ID: {user.id}</p>
                  <p>Role: {user.role}</p>
                </div>
                <NavLink to={`/user-info/${user.id}`}>
                  <Button variant="contained">More</Button>
                </NavLink>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Users;

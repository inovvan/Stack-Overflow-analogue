import * as styles from "./Header.module.scss";
import Button from "@mui/material/Button";
import Logo from "@/assets/icons/logo.svg";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (): void => {
    navigate("/login");
  };

   const handleLogout = async (): Promise<void> => {
    await logout();
    navigate("/login");
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles["header__logo"]}>
          <Logo className={styles["header__logo__icon"]} />
          <h1>CODELANG</h1>
        </div>
        {!user ? (
          <Button
            size="large"
            sx={{
              fontSize: {
                xs: "14px",
                sm: "18px",
              },
            }}
            variant="contained"
            color="white"
            onClick={handleLogin}
          >
            SIGN IN
          </Button>
        ) : (
          <Button
            size="large"
            sx={{
              fontSize: {
                xs: "14px",
                sm: "18px",
              },
            }}
            variant="contained"
            color="white"
            onClick={handleLogout}
          >
            SIGN OUT
          </Button>
        )}
      </header>
    </>
  );
};

export default Header;

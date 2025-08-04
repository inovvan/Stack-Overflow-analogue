import * as styles from "./Header.module.scss";
import Button from "@mui/material/Button";
import Logo from "@/assets/icons/logo.svg";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const Header: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <header className={styles.header}>
        <div className={styles["header__logo"]}>
          <Logo className={styles["header__logo__icon"]} />
          <h1>CODELANG</h1>
        </div>
        {!user ? <Button
          size="large"
          sx={{
            fontSize: {
              xs: "14px",
              sm: "18px",
            }
          }}
          variant="contained"
          color="white"
        >
          SIGN IN
        </Button> : <Button
          size="large"
          sx={{
            fontSize: {
              xs: "14px",
              sm: "18px",
            }
          }}
          variant="contained"
          color="white"
        >
          SIGN OUT
        </Button>}
      </header>
    </>
  );
};

export default Header;

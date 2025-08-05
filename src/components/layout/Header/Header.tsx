import * as styles from "./Header.module.scss";
import Logo from "@/assets/icons/logo.svg";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery, Button, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
        <IconButton
          onClick={toggleSidebar}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon fontSize="large" color="inherit" />
        </IconButton>
        <div className={styles["header__logo"]}>
          <Logo className={styles["header__logo__icon"]} />
          <h1>CODELANG</h1>
        </div>
        {!user ? (
          isMobile ? (
            <IconButton color="inherit" onClick={handleLogin}>
              <LoginIcon fontSize="large" />
            </IconButton>
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
              onClick={handleLogin}
            >
              SIGN IN
            </Button>
          )
        ) : isMobile ? (
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon fontSize="large" />
          </IconButton>
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

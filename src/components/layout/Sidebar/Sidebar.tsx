import { useContext } from "react";
import * as styles from "./Sidebar.module.scss";
import SidebarLink from "@/components/ui/SidebarLink";
import { AuthContext } from "@/context/AuthContext";
import clsx from "clsx";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import links from "./LinksMap";

type SidebarProps = {
  toggleSidebar: () => void;
  isActive: boolean;
};

const Sidebar: React.FC<SidebarProps> = ({ toggleSidebar, isActive }) => {
  const { user } = useContext(AuthContext);

  const handleClickLink = () => {
    if (window.innerWidth <= 800) {
      toggleSidebar();
    }
  };

  return (
    <div
      className={clsx(
        styles["sidebar"],
        isActive ? styles["sidebar--active"] : ""
      )}
    >
      {user && (
        <div className={styles["sidebar__avatar"]}>
          <AccountCircleIcon className={styles["sidebar__avatar-image"]} />
          <p>{user.username}</p>
        </div>
      )}
      <nav>
        <ul>
          {links.map((link) => (
            <li onClick={handleClickLink} key={link.to}>
              <SidebarLink to={link.to} label={link.label} Icon={link.Icon} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

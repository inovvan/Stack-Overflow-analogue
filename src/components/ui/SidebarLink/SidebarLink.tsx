import { useContext } from "react";
import * as styles from "./SidebarLink.module.scss";
import { NavLink } from "react-router-dom";
import { AuthContext } from "@/context/AuthContext";
import React from "react";
type SidebarLinkProps = {
  to: string;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, label, Icon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${styles["sidebar-link"]} ${
          isActive ? styles["sidebar-link--active"] : ""
        }`
      }
    >
      <Icon className={styles["sidebar-icon"]} />
      <p>{label}</p>
    </NavLink>
  );
};

export default SidebarLink;

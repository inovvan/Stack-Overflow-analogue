import { Outlet } from "react-router-dom";
import * as styles from "./Layout.module.scss";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Sidebar from "../Sidebar";
import { useState } from "react";

const Layout = () => {
  const [isActive, setIsActive] = useState(false);
  const toggleSidebar = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <Header toggleSidebar={toggleSidebar} />

      <main className={styles.main}>
        <Sidebar toggleSidebar={toggleSidebar} isActive={isActive} />
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default Layout;

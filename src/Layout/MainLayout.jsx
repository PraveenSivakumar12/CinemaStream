
import { Outlet } from "react-router-dom";
import Navbar from "../Nav_components/Navbar";
import Footer from "./Footer";

function MainLayout() {
  return (
    <div className="app-layout">
      <header>
        <Navbar />
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;

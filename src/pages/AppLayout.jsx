import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-light dark:bg-dark relative pb-20">
        <Header />
        <main className="flex-grow mt-10">
          <Outlet />
        </main>
        <div className="footer-space"></div>
        <Footer />
      </div>
    </>
  );
};

export default AppLayout;

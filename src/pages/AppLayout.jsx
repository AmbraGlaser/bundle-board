import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AppLayout = () => {
  return (
    <>
      <div className="flex flex-col bg-light dark:bg-dark">
        {/* Header component die bovenaan de pagina wordt weergegeven */}
        <Header />

        {/* Hoofdsectie van de pagina die de inhoud van de huidige route weergeeft */}
        <main className="flex-grow mt-10">
          <Outlet />
        </main>

        {/* Footer component die onderaan de pagina wordt weergegeven */}
        <Footer />
      </div>
    </>
  );
};

export default AppLayout;

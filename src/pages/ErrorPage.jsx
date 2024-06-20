import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  // Haal eventuele foutinformatie op van de router
  // const error = useRouteError();
  // const errorMessage = error.message;

  return (
    <>
      {/* Titel voor de foutpagina */}
      <h1 className="text-h2">
        Deze pagina bestaat helaas niet of is verwijderd.
      </h1>
      {/* Toon eventuele foutmelding */}
      {/* <p className="text-p">Error bericht: {errorMessage}</p> */}
      {/* Instructie om terug te gaan naar de startpagina */}
      <p className="text-h2">
        Ga{" "}
        <Link className="text-kumera-900 hover:text-white" to="/">
          terug
        </Link>{" "}
        naar de startpagina.
      </p>
    </>
  );
};

export default ErrorPage;

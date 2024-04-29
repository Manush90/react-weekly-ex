import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import WordPressContent from "./WordPressContent";
import "./App.css";

const App = () => {
  return (
    <div>
      <img
        src="Senza-titolo-1@1x_1-1.png"
        alt="Descrizione dell'immagine"
        className="img-fluid mx-auto d-block"
        style={{ maxWidth: "100px" }}
      />
      <h1 className="text-center">Articoli Dr.Wine</h1>
      <div className="row">
        <div className="col-md-12">
          <WordPressContent />
        </div>
      </div>
    </div>
  );
};

export default App;

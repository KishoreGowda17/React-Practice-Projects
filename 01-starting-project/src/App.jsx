import Header from "./components/Header/Header.jsx";
import CoreConcepts from "./components/CoreConcepts.jsx"
import Examples from "./components/Examples.jsx"
import { useState } from "react";


function App() {
  

 
  return (
    <>
      <Header />
      <main>
        <CoreConcepts />
        <Examples />
        
      </main>
    </>
  );
}

export default App;

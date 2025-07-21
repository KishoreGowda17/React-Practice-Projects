import React from "react";
import { useState } from "react";
import DerivedState from "./components/Hooks/useState/DerivedState";
import ParentEle from "./components/Hooks/useState/Lift-the-stateUp/parentEle";
import DisplayEle from "./components/Hooks/useState/Lift-the-stateUp/displayEle";

const App = () => {
  const [name, setname] = useState("");
  return (
    <>
      {/* <DerivedState /> */}
      <ParentEle name={name} setName={setname} />
      <DisplayEle name={name} />
    </>
  );
};

export default App;

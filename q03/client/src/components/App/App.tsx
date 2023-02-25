import React from "react";

import DragAndDrop from "../DragAndDrop";
import Batches from "../Batches";

import "./styles.css";

const App = () => (
  <div className="app">
    <div className="app-box">
      <DragAndDrop />
      <Batches />
    </div>
  </div>
);

export default App;

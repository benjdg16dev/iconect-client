import { useState } from "react";

import DragAndDrop from "../DragAndDrop";
import Batches from "../Batches";

import { TBatchList } from "./App.types";
import "./styles.css";

const App = () => {
  // Note: Create GET API for initial files
  const [batchList, setBatchList] = useState<TBatchList>([]);

  return (
    <div className="app">
      <div className="app-box">
        <DragAndDrop batchList={batchList} setBatchList={setBatchList} />
        <Batches batchList={batchList} />
      </div>
    </div>
  );
};

export default App;

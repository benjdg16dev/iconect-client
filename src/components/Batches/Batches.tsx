import React, { useState, useEffect } from "react";

import { TBatch, TBatchList } from "../App/App.types";

import Batch from "./Batch";
import "./style.css";

const renderNoFiles = () => {
  return <div className="no-files">No files uploaded.</div>;
};

const hasFiles = false;

interface IBatches {
  batchList: TBatchList;
}

const Batches = ({ batchList }: IBatches) => {
  // const [batches, setBatches] = useState<TBatchList>([]);

  // useEffect(() => {
  //   if (batchList) {
  //     // Get latest
  //   }
  // }, [batchList]);

  return (
    <div className="batches-container">
      <div className="batches">
        <div className="batches-header">
          <h1>Upload file</h1>
        </div>
        <div className="batches-body">
          {/* {hasFiles ? <div className="list"></div> : renderNoFiles()} */}
          {batchList
            ? batchList.map((batch: TBatch) => <Batch batch={batch} />)
            : null}
        </div>
      </div>
    </div>
  );
};

export default Batches;

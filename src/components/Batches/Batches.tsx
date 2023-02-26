import React, { useState, useEffect } from "react";

import { TBatch, TBatchList } from "../App/App.types";
import NoFilesFound from "../subcomponents/NoFilesFound";

import Batch from "./Batch";
import "./style.css";

const hasFiles = false;

interface IBatches {
  batchList: TBatchList;
}

const Batches = ({ batchList }: IBatches) => {
  console.log(batchList);
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
          <h1>Uploaded file/s</h1>
        </div>
        {batchList && batchList.length > 0 ? (
          <div className="batches-body">
            {batchList.map((batch: TBatch) => (
              <Batch batch={batch} />
            ))}
          </div>
        ) : (
          <NoFilesFound />
        )}
      </div>
    </div>
  );
};

export default Batches;

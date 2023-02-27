import { TBatch, TBatchList } from "../App/App.types";
import NoFilesFound from "../subcomponents/NoFilesFound";

import Batch from "../subcomponents/Batch";
import "./style.css";

interface IBatches {
  batchList: TBatchList;
}

const Batches = ({ batchList }: IBatches) => {
  return (
    <div className="batches-container">
      <div className="batches">
        <div className="batches-header">
          <h1>Uploaded file/s</h1>
        </div>
        {batchList && batchList.length > 0 ? (
          <ul className="batches-body">
            {batchList.map((batch: TBatch, index) => (
              <Batch key={index} batch={batch} />
            ))}
          </ul>
        ) : (
          <NoFilesFound />
        )}
      </div>
    </div>
  );
};

export default Batches;

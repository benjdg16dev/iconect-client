import React from "react";

import "./style.css";

const renderNoFiles = () => {
  return <div className="no-files">No files uploaded.</div>;
};

const hasFiles = false;

const Batches = () => {
  return (
    <div className="batches-container">
      <div className="batches">
        <div className="batches-header">
          <h1>Upload file</h1>
        </div>
        <div className="batches-body">
          {hasFiles ? <div className="list"></div> : renderNoFiles()}
        </div>
      </div>
    </div>
  );
};

export default Batches;

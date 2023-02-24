import React, { ChangeEvent } from "react";

import "./styles.css";

const DragAndDrop = () => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // setFileList(e.target.files);
    console.log(e.target.files);
  };

  return (
    <div className="drag-and-drop">
      {" "}
      <input type="file" onChange={handleFileChange} multiple />
    </div>
  );
};

export default DragAndDrop;

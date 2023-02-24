import React from "react";

import "./styles.css";

const DragAndDrop = () => {
  return (
    <div className="drag-and-drop">
      {" "}
      <input type="file" onChange={() => console.log("hey")} multiple />
    </div>
  );
};

export default DragAndDrop;

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";

import { FileUploadIcon } from "../subcomponents/Icon";
import { formatBytes } from "../../helpers/helpers";

import "./styles.css";

const DragAndDrop = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [isSwitched, setIsSwitched] = useState<boolean>(false);

  const handleDragEnter = (e: DragEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    (overlayRef.current as HTMLDivElement).classList.add("dragging");
  };

  const handleFiles = (
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    (overlayRef.current as HTMLDivElement).classList.remove("dragging");
    setIsSwitched(true);
    console.log(e.type);

    if (e.type === "change") {
      // Event from "Choose file button"
    } else if (e.type === "drop") {
      // Event from drag & drop
    }
    // API
  };

  return (
    <>
      <form action=""></form>
      {isSwitched ? (
        <div className="custodian">
          <input type="text" name="custodian-name" id="custodian-name" />
        </div>
      ) : (
        <div
          className="drag-and-drop"
          onDragOver={handleDragEnter}
          onDrop={handleFiles}
        >
          <div className="drag-and-drop-overlay" ref={overlayRef}>
            <div className="drag-and-drop-icon">
              <FileUploadIcon size={80} color={"#8dc63f"} />
            </div>
            <div className="drag-and-drop-title">
              <h2>Drag and drop files to upload</h2>
            </div>
            <div className="drag-and-drop-input">
              <input
                id="input-file-upload"
                type="file"
                multiple
                onChange={handleFiles}
              />
              <label id="label-file-upload" htmlFor="input-file-upload">
                Supported files: .txt, .doc, .pdf, .xlsx etc.
              </label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DragAndDrop;

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";

import { FileUploadIcon } from "../subcomponents/Icon";
import { formatBytes } from "../../helpers/helpers";

import "./styles.css";

const DragAndDropOverlay = () => {
  return <div className="drag-and-drop-overlay" />;
};

const DragAndDrop = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleFileChange = (e: any) => {
    console.log(`onChange`);
    e.preventDefault();
    e.stopPropagation();
    console.log(e.dataTransfer.files);
    setFileList(e.target.files);
    console.log(e.target.files);
    console.log(formatBytes((e.target.files as FileList)[0].size));
  };

  const handleDragEnter = (e: DragEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(`onDragEnter`);
    (overlayRef.current as HTMLDivElement).classList.add("dragging");
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(`onDrop`);
    (overlayRef.current as HTMLDivElement).classList.remove("dragging");

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log(e.dataTransfer.files[0]);
    }
  };

  return (
    <>
      <div
        className="drag-and-drop"
        onDragOver={handleDragEnter}
        onDrop={handleDrop}
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
              onChange={handleFileChange}
            />
            <label id="label-file-upload" htmlFor="input-file-upload">
              Supported files: .txt, .doc, .pdf, .xlsx etc.
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DragAndDrop;

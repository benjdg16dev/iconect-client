import React, {
  useState,
  useRef,
  ChangeEvent,
  DragEvent,
  FormEvent,
} from "react";
import axios from "axios";

import { SERVER_CONFIG } from "../../constants/server";
import { FileUploadIcon } from "../subcomponents/Icon";

import "./styles.css";

const DragAndDrop = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [custodianName, setCustodianName] = useState<string>("");
  const [isSwitched, setIsSwitched] = useState<boolean>(false);

  // const [uploadedFile, setUploadedFile] = useState<>();

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

    if (e.type === "change") {
      // Event from "Choose file button"
      setFileList((e as ChangeEvent<HTMLInputElement>).target.files);
    } else if (e.type === "drop") {
      // Event from drag & drop
      setFileList((e as DragEvent<HTMLElement>).dataTransfer.files);
    }
  };

  const handleCustodianInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCustodianName(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSwitched(false);

    const formData = new FormData();
    formData.append(SERVER_CONFIG.CUSTODIAN_KEY, custodianName);

    if (fileList) {
      for (let i = 0; i < fileList.length; i++) {
        console.log(fileList[i]);
        formData.append(SERVER_CONFIG.FILE_KEY, fileList[i]);
      }
    }

    // formData.append("fileList", fileList as any, custodianName);

    console.log(formData);
    try {
      // Note: Proxy http://localhost:8080
      const res = await axios.post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.isUploaded) {
        // Update handler on Batches tsx
        console.log(res.data.body[SERVER_CONFIG.CUSTODIAN_KEY]);
        console.log(res.data.length);
      } else {
        // Negative scenario
      }
    } catch (err: any) {
      if (err.response.status === 500) {
        console.error(`Error 500: Internal Server Error`);
      } else if (err.response.status === 400) {
        console.log(`Error 400: Bad Request`);
      } else {
        console.error(err.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="drag-and-drop-container">
        <form onSubmit={handleSubmit}>
          {isSwitched ? (
            <div className="custodian">
              <input
                type="text"
                name="custodian-name"
                id="custodian-name"
                onChange={handleCustodianInput}
              />
              <button type="submit">Submit</button>
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
                  <button
                    onClick={() => inputFileRef.current?.click()}
                    type="button"
                  >
                    Choose a file
                  </button>
                  <input
                    ref={inputFileRef}
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
        </form>
      </div>
    </>
  );
};

export default DragAndDrop;

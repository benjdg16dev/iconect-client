import React, {
  useState,
  useRef,
  ChangeEvent,
  Dispatch,
  DragEvent,
  FormEvent,
  MouseEvent,
  SetStateAction,
} from "react";
import axios, { AxiosProgressEvent } from "axios";

import { SERVER_CONFIG } from "../../constants/server";
import { TBatch, TBatchList, EFileTypes } from "../App/App.types";
import { FileUploadIcon } from "../subcomponents/Icon";

import "./styles.css";

interface IDragAndDrop {
  batchList: TBatchList;
  setBatchList: Dispatch<SetStateAction<TBatchList>>;
}

const DragAndDrop = ({ batchList, setBatchList }: IDragAndDrop) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<FileList | null>(null);
  const [custodianName, setCustodianName] = useState<string>("");
  const [isSwitched, setIsSwitched] = useState<boolean>(false);
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [fileType, setFileType] = useState<EFileTypes>(EFileTypes.UNSUPPORTED);

  // const [uploadedFile, setUploadedFile] = useState<>();

  const handleDragEnter = (e: DragEvent<HTMLElement>) => {
    e.stopPropagation();
    e.preventDefault();
    (overlayRef.current as HTMLDivElement).classList.add("dragging");
  };

  const handleFileType = (fileList: FileList | null) => {
    if (fileList) {
      if (fileList.length > 1) {
        setFileType(EFileTypes.MULTIPLE);
      } else {
        const _type = fileList[0].type;
        console.log(_type);
        console.log(_type.includes(EFileTypes.TEXT));
        console.log(EFileTypes.TEXT);
        if (_type.includes(EFileTypes.TEXT)) {
          setFileType(EFileTypes.TEXT);
        } else if (_type.includes(EFileTypes.IMAGE)) {
          setFileType(EFileTypes.IMAGE);
        } else if (_type.includes(EFileTypes.WORD)) {
          setFileType(EFileTypes.WORD);
        } else if (_type.includes(EFileTypes.SHEET)) {
          setFileType(EFileTypes.SHEET);
        } else if (_type.includes(EFileTypes.PDF)) {
          setFileType(EFileTypes.PDF);
        } else {
          setFileType(EFileTypes.UNSUPPORTED);
        }
      }
    }
  };

  const handleFiles = (
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    (overlayRef.current as HTMLDivElement).classList.remove("dragging");
    setIsSwitched(true);

    // console.log(e);

    if (e.type === "change") {
      // Event from "Choose file button"
      const _files = (e as ChangeEvent<HTMLInputElement>).target.files;
      handleFileType(_files);

      setFileList(_files);
    } else if (e.type === "drop") {
      // Event from drag & drop
      const _files = (e as DragEvent<HTMLElement>).dataTransfer.files;
      handleFileType(_files);
      setFileList(_files);
    }
  };

  const handleCustodianInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCustodianName(e.target.value);
  };

  const handleBack = (e: MouseEvent) => {
    setIsSwitched(false);
    setFileList(null);
    setCustodianName("");
    setUploadPercentage(0);
    setFileType(EFileTypes.UNSUPPORTED);
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

    const newBatch: TBatch = {
      formData: formData,
      custodianName: custodianName,
      dataType: fileType,
    };

    // Note: Pass to Batch.tsx
    setBatchList([...batchList, newBatch]);

    // try {
    //   const res = await axios.post("http://localhost:8080/upload", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     onUploadProgress: (progressEvent: AxiosProgressEvent) => {
    //       console.log(progressEvent);
    //       const { total, loaded } = progressEvent;
    //       if (!!total && !!loaded) {
    //         setUploadPercentage(Math.round((loaded * 100) / total));
    //         console.log(Math.round((loaded * 100) / total));
    //       }

    //       // Clear percentage
    //     },
    //   });

    //   if (res.data.isUploaded) {
    //     // Update handler on Batches tsx
    //     console.log(`%cUpload succesful`, "color: green");
    //     const date = new Date();
    //     setBatchList([...batchList, date.toLocaleTimeString()]);
    //   } else {
    //     // Negative scenario
    //   }
    // } catch (err: any) {
    //   if (err.response.status === 500) {
    //     console.error(`Error 500: Internal Server Error`);
    //   } else if (err.response.status === 400) {
    //     console.error(`Error 400: Bad Request`);
    //   } else {
    //     console.error(err.response.data.message);
    //   }
    // }
  };

  return (
    <>
      <div className="drag-and-drop-container">
        <form className="drag-and-drop-form" onSubmit={handleSubmit}>
          <div
            className="drag-and-drop"
            onDragOver={handleDragEnter}
            onDrop={handleFiles}
          >
            {isSwitched ? (
              <div className="custodian">
                <div className="custodian-title">
                  <h3>
                    {fileList
                      ? `Uploading ${fileList.length} file${
                          fileList.length > 1 ? `s` : ""
                        }`
                      : `Files not found.`}
                  </h3>
                  <span>
                    Please input a custodian name before submitting or click go
                    back to start again.
                  </span>
                </div>
                <div className="custodian-name-input">
                  <label id="custodian-name-label" htmlFor="custodian-name">
                    Custodian name
                  </label>
                  <input
                    type="text"
                    name="custodian-name"
                    id="custodian-name"
                    required
                    onChange={handleCustodianInput}
                  />
                </div>
                <div className="custodian-buttons">
                  <button type="submit" disabled={!custodianName}>
                    Submit
                  </button>
                  <button
                    className="secondary"
                    type="button"
                    onClick={handleBack}
                  >
                    Go back
                  </button>
                </div>
              </div>
            ) : (
              <div className="drag-and-drop-overlay" ref={overlayRef}>
                <div className="drag-and-drop-icon">
                  <FileUploadIcon size={80} color={"#75a478"} />
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
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default DragAndDrop;

import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosProgressEvent } from "axios";

import { EFileTypes, TBatch } from "../App/App.types";
import * as Icons from "../subcomponents/Icon";
import "./style.css";

interface IBatch {
  batch: TBatch;
}

const Batch = ({ batch }: IBatch) => {
  const progressRef = useRef<HTMLProgressElement>(null);
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [uploadFinished, setUploadFinish] = useState<boolean>(false);

  const { formData, custodianName } = batch;

  useEffect(() => {
    console.log(`Batch ${custodianName} start useeffect`);
    handleUpload();
  }, []);

  useEffect(() => {
    if (uploadFinished) {
      (progressRef.current as HTMLProgressElement).classList.add("hidden");
    }
  }, [uploadFinished]);

  const handleUpload = async () => {
    try {
      const res = await axios.post("upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: AxiosProgressEvent) => {
          const { total, loaded } = progressEvent;
          if (!!total && !!loaded) {
            setUploadPercentage(Math.round((loaded * 100) / total));
          }

          // Clear percentage
        },
      });

      if (res.data.isUploaded) {
        // Update handler on Batches tsx
        // console.log(`%cUpload succesful`, "color: green");
        const date = new Date();
        setUploadFinish(true);

        //   setBatchList([...batchList, date.toLocaleTimeString()]);
      } else {
        // Negative scenario
      }
    } catch (err: any) {
      if (err.response.status === 500) {
        console.error(`Error 500: Internal Server Error`);
      } else if (err.response.status === 400) {
        console.error(`Error 400: Bad Request`);
      } else {
        console.error(err.response.data.message);
      }
    }
  };

  const renderIcon = (dataType: EFileTypes) => {
    const iconSize = 32;
    if (dataType === EFileTypes.IMAGE) {
      return <Icons.ImageIcon size={iconSize} color={`#FFB74D`} />;
    } else if (dataType === EFileTypes.MULTIPLE) {
      return <Icons.FolderIcon size={iconSize} color={`#FFF176`} />;
    } else if (dataType === EFileTypes.PDF) {
      return <Icons.PDFFileIcon size={iconSize} color={`#E57373`} />;
    } else if (dataType === EFileTypes.SHEET) {
      return <Icons.SheetFileIcon size={iconSize} color={`#81C784`} />;
    } else if (dataType === EFileTypes.TEXT) {
      return <Icons.TextFileIcon size={iconSize} color={`#90A4AE`} />;
    } else if (dataType === EFileTypes.WORD) {
      return <Icons.WordFileIcon size={iconSize} color={`#64B5F6`} />;
    } else {
      return <Icons.UnknownFileIcon size={iconSize} color={`#FF8A65`} />;
    }
  };

  return (
    <div className="batch">
      <div className="batch-left-container">{renderIcon(batch.dataType)}</div>
      <div className="batch-right-container">
        <div className="batch-info">
          <span>{`${custodianName}`}</span>
        </div>
        <progress
          ref={progressRef}
          value={uploadPercentage}
          max="100"
        >{`${uploadPercentage}%`}</progress>
      </div>
    </div>
  );
};

export default Batch;

import { useState, useEffect, useRef } from "react";
import axios, { AxiosError, AxiosProgressEvent } from "axios";

import { EFileTypes, TBatch } from "../../App/App.types";
import * as Icons from "../Icon";
import "./style.css";

interface IBatch {
  batch: TBatch;
}

const Batch = ({ batch }: IBatch) => {
  const iconSize = 32;
  const progressRef = useRef<HTMLProgressElement>(null);
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [uploadFinished, setUploadFinish] = useState<boolean>(false);
  const [hasUploadError, setHasUploadError] = useState<boolean>(false);

  const { formData, custodianName } = batch;

  useEffect(() => {
    handleUpload();
  }, []);

  useEffect(() => {
    if (!hasUploadError && uploadFinished) {
      (progressRef.current as HTMLProgressElement).classList.add("hidden");
    }
  }, [hasUploadError, uploadFinished]);

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
        },
      });

      if (res.data.isUploaded) {
        setUploadFinish(true);
      }
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        if (err.response) {
          if (err.response.status === 500) {
            console.error(`Error 500: Internal Server Error`);
          } else if (err.response.status === 400) {
            console.error(`Error 400: Bad Request`);
          } else {
            console.error(err.response.data.message);
          }
        } else {
          console.error(`${err.code}: ${err.message}`);
        }
      }
      setUploadFinish(true);
      setHasUploadError(true);
    }
  };

  const renderIcon = (dataType: EFileTypes) => {
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
    <li className="batch">
      <div className="batch-left-container">{renderIcon(batch.dataType)}</div>
      <div className="batch-center-container">
        <div className="batch-info">
          <span className="batch-info-name">{`${custodianName}`}</span>
          <span className="batch-info-size">{`File Size: ${batch.fileSize}`}</span>
        </div>
        {hasUploadError ? null : (
          <progress
            ref={progressRef}
            value={uploadPercentage}
            max="100"
          >{`${uploadPercentage}%`}</progress>
        )}
      </div>
      <div className="batch-right-container">
        {uploadFinished ? (
          <>
            {hasUploadError ? (
              <Icons.CrossIcon size={iconSize} color={"#F44336"} />
            ) : (
              <Icons.CheckIcon size={iconSize} color={"#4CAF50"} />
            )}
          </>
        ) : null}
      </div>
    </li>
  );
};

export default Batch;

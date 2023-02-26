import React from "react";

import { IIcon } from "./Icon.types";
import "./style.css";

const FileUploadIcon = (props: IIcon) => {
  return (
    <span className="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={props.size ?? "48px"}
        width={props.size ?? "48px"}
        viewBox="0 96 960 960"
        fill={props.color ?? "black"}
      >
        <path d="M452 854h60V653l82 82 42-42-156-152-154 154 42 42 84-84v201ZM220 976q-24 0-42-18t-18-42V236q0-24 18-42t42-18h361l219 219v521q0 24-18 42t-42 18H220Zm331-554V236H220v680h520V422H551ZM220 236v186-186 680-680Z" />
      </svg>
    </span>
  );
};

export default FileUploadIcon;

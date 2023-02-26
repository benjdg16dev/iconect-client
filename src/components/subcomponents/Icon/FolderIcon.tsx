import React from "react";

import { IIcon } from "./Icon.types";
import "./style.css";

const FolderIcon = (props: IIcon) => {
  return (
    <span className="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        height={props.size ?? "48px"}
        width={props.size ?? "48px"}
        fill={props.color ?? "black"}
      >
        <path d="M64 480H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H288c-10.1 0-19.6-4.7-25.6-12.8L243.2 57.6C231.1 41.5 212.1 32 192 32H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64z" />
      </svg>
    </span>
  );
};

export default FolderIcon;

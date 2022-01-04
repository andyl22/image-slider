/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useEffect } from "react";

const modal = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: 1;
  background: rgba(178, 178, 178, 0.8);
  &:hover {
    cursor: zoom-out;
  }
`;

const image = css`
  border-radius: 5em;
  &:hover {
    cursor: default;
  }
`;

export default function ImageModal(props) {
  const { src, alt, handleClose } = props;

  const handleClickToClose = (e) => {
    if (e.target.tagName !== "IMG") {
      handleClose();
    }
  };

  const handleKeyPress = (e) => {
    if(e.keyCode===27 || e.keyCode===9) {
      handleClose();  
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return() => document.removeEventListener("keydown", handleKeyPress);
  })

  return (
    <div css={modal} onClick={handleClickToClose}>
      <img src={src} alt={alt} css={image}/>
    </div>
  );
}

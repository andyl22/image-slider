/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ImageModal from "./ImageModal";

export default function ImageSlider(props) {
  const [numberOfImagesToRender, setNumberOfImagesToRender] = useState(
    window.innerWidth > 900 ? 3 : window.innerWidth > 600 ? 2 : 1
  );
  const imageSlider = css`
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    background: #dfdfdf;
    padding: 2em 1em;
    border-radius: 2em;
    overflow: auto;
  `;

  const arrows = css`
    transform: scale(2);
    color: #8c8c8c;
    &:hover {
      cursor: pointer;
    }
  `;

  const image = css`
    height: 250px;
    width: 250px;
    background: black;
    color: white;
    border-radius: 0.5em;
    &:hover {
      cursor: zoom-in;
    }
    @media (max-width: 900px) {
      height: 200px;
      width: 200px;
    }
  `;

  const handleBack = (e) => {
    if (slideNumber <= 0) return;
    setSlideNumber(slideNumber - 1);
  };

  const handleForward = (e) => {
    if (imgArray.length - numberOfImagesToRender <= slideNumber) return;
    setSlideNumber(slideNumber + 1);
  };

  // Mouseclick state and handler are used to prevent click focuses from executing handleFocus.
  const handleMouseClick = (e) => {
    setMouseDown(!mouseDown);
  };

  const handleFocus = (e) => {
    if (mouseDown) return;
    if (e.target.tabIndex === slideNumber + 3) {
      handleForward();
    }
    if (e.target.tabIndex === slideNumber + 1) {
      handleBack();
    }
  };

  const handleExpand = (e) => {
    //passes the setModalImage to the modal, so it can be used to close the modal
    setModalImage(
      <ImageModal
        src={e.target.src}
        alt={e.target.alt}
        handleClose={setModalImage}
      />
    );
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) handleExpand(e);
  };

  const { imgArray } = props;
  const [modalImage, setModalImage] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  const mappedArray = imgArray.map((img, i) => (
    <img
      css={image}
      key={img.src}
      src={img.src}
      alt={img.alt}
      draggable={false}
      onClick={handleExpand}
      tabIndex={i + 1}
      onFocusCapture={handleFocus}
      onKeyPress={handleKeyPress}
      onMouseDown={handleMouseClick}
      onMouseUp={handleMouseClick}
    />
  ));

  const [slideNumber, setSlideNumber] = useState(0);
  const slicedArray = [
    ...mappedArray.slice(slideNumber, slideNumber + numberOfImagesToRender),
  ];

  useEffect(() => {
    window.addEventListener("resize", () => {
      setNumberOfImagesToRender(
        window.innerWidth > 900 ? 3 : window.innerWidth > 600 ? 2 : 1
      );
    });
  }, []);

  return (
    <div css={imageSlider}>
      {modalImage}
      <ArrowBackIosNewIcon
        css={arrows}
        onClick={handleBack}
        role="button"
        aria-label="previous-image"
        tabIndex="1"
      />
      {slicedArray}
      <ArrowForwardIosIcon
        css={arrows}
        onClick={handleForward}
        role="button"
        aria-label="next-image"
        tabIndex="0"
      />
    </div>
  );
}

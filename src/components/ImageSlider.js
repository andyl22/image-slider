/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import React, { useState, useEffect } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ImageModal from "./ImageModal";


const imageSlider = css`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  background: #DFDFDF;
  padding: 2em 1em;
  border-radius: 2em;
`;

const arrows = css`
transform: scale(2);
color: #8C8C8C;
  &:hover {
    cursor: pointer;
  }
`

const image = css`
  height: 250px;
  width: 250px;
  background: black;
  color: white;
  border-radius: .5em;
  &:hover {
    cursor: zoom-in;
  }
`

export default function ImageSlider(props) {
  const handleExpand = (e) => {
    //passes the setModalImage to the modal, so it can be used to close the modal
    setModalImage(<ImageModal src={e.target.src} alt={e.target.alt} handleClose={setModalImage}/>);
  };

  const handleBack = () => {
    if(slideNumber<=0) return;
    setSlideNumber(slideNumber-1);
  };
  
  const handleForward = () => {
    if(imgArray.length-3<=slideNumber) return;
    setSlideNumber(slideNumber+1);
  };

  const handleFocus = (e) => {
    console.log(slideNumber)
    if(e.target.tabIndex===slideNumber+3) {
      handleForward();
    }
    if(e.target.tabIndex===slideNumber+1) {
      handleBack();
    }
  }

  const handleKeyPress = (e) => { 
    if(e.charCode === 13) handleExpand(e)
  }

  const {imgArray} = props; 
  const [modalImage, setModalImage] = useState(null);
  const mappedArray = imgArray.map((img, i) => <img css={image} key={img.src} src={img.src} alt={img.alt} draggable={false} onClick={handleExpand} tabIndex={i+1} onFocus={handleFocus} onKeyPress={handleKeyPress}/>);
  const [slideNumber, setSlideNumber] = useState(0);
  const slicedArray = [...mappedArray.slice(slideNumber, slideNumber+3)];

  return (
    <div css={imageSlider}>
      {modalImage}
      <ArrowBackIosNewIcon css={arrows} onClick={handleBack}/>
      {slicedArray}
      <ArrowForwardIosIcon css={arrows} onClick={handleForward}/>  
    </div>
  );
}

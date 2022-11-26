import React, { useState, useEffect, useRef } from 'react';
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import paidPic from '../../assets/paidPic.png'

const LoadPDF = () => {
    const [pdfInfo, setPdfInfo] = useState([]);
    const viewer = useRef(null);

    useEffect(() => {
      modifyPdf();
    }, []);
  
    const modifyPdf = async () => {
      const existingPdfBytes = await fetch(
        "https://pdf-lib.js.org/assets/with_update_sections.pdf"
      ).then((res) => res.arrayBuffer());
  
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      
      // Get the width and height of the first page
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
  
      const pngImageBytes = await fetch(paidPic).then((res) => res.arrayBuffer())
      
      const pngImage = await pdfDoc.embedPng(pngImageBytes)
      const pngDims = pngImage.scale(0.12)
      
      firstPage.drawImage(pngImage, {
        x: firstPage.getWidth() / 2 - pngDims.width / 3 + 50,
        y: firstPage.getHeight() / 7 - pngDims.height + 250,
        width: pngDims.width,
        height: pngDims.height,
        rotate: degrees(55)
      })
      const pdfBytes = await pdfDoc.save();
      const docUrl = URL.createObjectURL(
        new Blob([pdfBytes], { type: "application/pdf" })
      );
      setPdfInfo(docUrl);
    };
    return (
        <>{<iframe title="test-frame" src={pdfInfo} ref={viewer} type="application/pdf" />}</>
      );
  };
  
  export default LoadPDF;




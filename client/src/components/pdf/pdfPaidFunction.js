import React, { useState, useEffect, useRef } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import paidPic from '../../assets/paidPic.png'
import { Box } from '@chakra-ui/react';

const LoadPdfPaid = ({idpdf}) => {

    const [pdfInfo, setPdfInfo] = useState([]);
    const viewer = useRef(null);
    const pdfID = idpdf
 
    useEffect(() => {
      modifyPdf();
    }, []);
  
    const modifyPdf = async () => {

      //const url = `https://netorg8591642-my.sharepoint.com/:f:/g/personal/irina_naturalistone_com/EuA-Cr0-Z-tJojSeZXDx-MgBQJiFxcQo3ndaFifr11jCLA?e=giHGBa/${pdfID}.pdf`
      //const url = `https://netorg8591642-my.sharepoint.com/personal/irina_naturalistone_com/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Firina%5Fnaturalistone%5Fcom%2FDocuments%2FNaturali%2FInvoicesReceived%2FParsed%20Documents%2FInvoice%20Naturali%2F${pdfID}%2Epdf&parent=%2Fpersonal%2Firina%5Fnaturalistone%5Fcom%2FDocuments%2FNaturali%2FInvoicesReceived%2FParsed%20Documents%2FInvoice%20Naturali`
      
      const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
      var bytes = new Uint8Array(existingPdfBytes);
      const pdfDoc = await PDFDocument.load(bytes);

      
      // Get the width and height of the first page
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      //const { width, height } = firstPage.getSize();
  
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
      <Box h={'85vh'} >
        {<iframe width={'100%'} height={'100%'} title="test-frame" src={pdfInfo} ref={viewer} type="application/pdf" />}
      </Box>
    )
  };
  
  export default LoadPdfPaid;


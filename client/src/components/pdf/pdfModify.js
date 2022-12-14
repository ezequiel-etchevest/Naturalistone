import React, { useState, useEffect, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Box } from '@chakra-ui/react';


const LoadPDF = ({idpdf}) => {

    const [pdfInfo, setPdfInfo] = useState([]);
    const viewer = useRef(null);
    const pdfID = idpdf
 
    useEffect(() => {
      modifyPdf();
    }, []);
  
    const modifyPdf = async () => {

      const url = `/InvoiceNaturali/${pdfID}.pdf`
      const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

      var bytes = new Uint8Array(existingPdfBytes);
      const pdfDoc = await PDFDocument.load(bytes);

      const pdfBytes = await pdfDoc.save();
      const docUrl = URL.createObjectURL(
        new Blob([pdfBytes], { type: "application/pdf" })
      );
      setPdfInfo(docUrl);
    };
    return (
        <Box h={'85vh'}>
        {<iframe width={'100%'} height={'100%'} title="test-frame" src={pdfInfo} ref={viewer} type="application/pdf" />}
        </Box>
      );
  };
  
  export default LoadPDF;


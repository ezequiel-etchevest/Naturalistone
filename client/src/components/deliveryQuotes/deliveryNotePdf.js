import React, { useState, useEffect, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Box } from '@chakra-ui/react';
import { saveAs } from 'file-saver';

const LoadPdfDelivery = ({quantities}) => {

    const [pdfInfo, setPdfInfo] = useState([]);
    const viewer = useRef(null);
   
    useEffect(() => {
        CreateForm();
    }, []);

    const products = {};


    quantities.forEach((product, index) => {
      const variableName = `${index + 1}`;
      products[variableName] = product;
    });

    
async function CreateForm() {

  const url = `/DeliveryNote/DemoDeliveryNote.pdf`
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
  var bytes = new Uint8Array(existingPdfBytes);
  const pdfDoc = await PDFDocument.load(bytes);

  const pages = pdfDoc.getPages();
  const page = pages[0];

  const no = '3585'
  const date = '2022-01-20'
  const name = 'Eclipse Designs.'
  const company = 'Eclipse Designs, Inc.'
  const street = '700 Quail Ridge Road'
  const city = 'Aledo'
  const state = 'Texas'
  const zipCode = '76008'
  const type = 'Tile'
  let y = 482;

  page.drawText(`${no}`, { x: 472, y: 666, size: 16 })
  page.drawText(`${date}`, { x: 138, y: 570, size: 10 })
  page.drawText(`${name}`, { x: 360, y: 612, size: 10 })
  page.drawText(`${company}`, { x: 360, y: 598, size: 10 })
  page.drawText(`${street}`, { x: 360, y: 584, size: 10 })
  page.drawText(`${city}, ${state}`, { x: 360, y: 570, size: 10 })
  page.drawText(`${zipCode}`, { x: 360, y: 556, size: 10 })
  page.drawText(`${type}`, { x: 40, y: 508, size: 10 })



//This line uses the forEach method to iterate over each key-value pair in the array created by Object.
//entries. For each iteration, the key (variableName) and value (element) are destructured from the pair and
//passed as arguments to the callback function.

  Object.entries(products).forEach(([variableName, element]) => {
    const product = products[variableName];
    page.drawText(`${product.quantity}`, { x: 40, y, size: 10 });
    page.drawText(`${product.prodName}`, { x: 80, y, size: 10 });
    page.drawText(`${product.type} ${product.size} ${product.thickness} ${product.finish}`, { x: 340, y, size: 10 });
    y -= 14;
  });


  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  
  setPdfInfo(URL.createObjectURL(blob));

  //saveAs(blob, `${no}.pdf`);
  
  };
  return (
  <Box h={'85vh'} >
    {<iframe width={'100%'} height={'100%'} title="test-frame" src={pdfInfo} ref={viewer} type="application/pdf" />}
  </Box>
  )
  };
export default LoadPdfDelivery
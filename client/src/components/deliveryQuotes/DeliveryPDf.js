import React, { useState, useEffect, useRef } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';


const DeliveryNotePdf = ({ pdfInfo, setPdfInfo }) => {
  
    const delivery = useSelector(state => state.delivery_by_id)

    const viewer = useRef(null);
   console.log('delivery', delivery)
    useEffect(() => {
      CreateForm();
    }, []);

    const products = {};

    delivery.forEach((product, index) => {
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

  const invoiceID = delivery[0].SaleID
  const no = delivery[0].DeliveryNumber
  const date = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
  let y = 482.8;

  const name = 'Eclipse Designs.'
  const company = 'Eclipse Designs, Inc.'
  const street = '700 Quail Ridge Road'
  const city = 'Aledo'
  const state = 'Texas'
  const zipCode = '76008'
  

  page.drawText(`${no}`, { x: 472, y: 666, size: 16, color: rgb(1, 0.3, 0) })
  page.drawText(`${date}`, { x: 138, y: 570, size: 10 })
  page.drawText(`Associated to invoice N°`, { x: 402, y: 688, size: 10})
  page.drawText(`${invoiceID}`, { x: 514, y: 688, size: 12, color: rgb(1, 0.3, 0)})
  page.drawText(`Type`, { x: 38, y: 509, size: 10 })
  page.drawText(`Quantity`, { x: 508, y: 509, size: 10 })

  page.drawText(`${name}`, { x: 360, y: 612, size: 10 })
  page.drawText(`${company}`, { x: 360, y: 598, size: 10 })
  page.drawText(`${street}`, { x: 360, y: 584, size: 10 })
  page.drawText(`${city}, ${state}`, { x: 360, y: 570, size: 10 })
  page.drawText(`${zipCode}`, { x: 360, y: 556, size: 10 })

//prodSold maximo stock reservado en esa columna

//This line uses the forEach method to iterate over each key-value pair in the array created by Object.
//entries. For each iteration, the key (variableName) and value (element) are destructured from the pair and
//passed as arguments to the callback function.

  Object.entries(products).forEach(([variableName, element]) => {
    const product = products[variableName];
    page.drawText(`${product.Quantity}`, { x: 518, y, size: 10 });
    page.drawText(`${product.ProdName} - ${product.Finish}`, { x: 80, y, size: 10 });
    page.drawText(`${product.Size}  ${product.Thickness}`, { x: 352, y, size: 10 });
    page.drawText(`${product.Type}`, { x: 38, y, size: 10 });
    y -= 14;
  });


  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  
  setPdfInfo(URL.createObjectURL(blob));
  
    console.log("pdfinfio", pdfInfo)
  };


  return (
  <Box h={'85vh'} >
    {<iframe width={'100%'} height={'100%'} title="test-frame" src={pdfInfo} ref={viewer} type="application/pdf" />}
  </Box>
  )
  };
export default DeliveryNotePdf
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { PDFDocument, rgb } from 'pdf-lib';
import { Box, Center, Spinner } from '@chakra-ui/react';


const CreatedQuotePdf = ({variables, user, customer, project, products}) => {
// console.log('customer',customer)
// console.log('products',products)
// console.log(user)

    const posted_quote = useSelector(state => state.posted_quote)
 
    const [pdfInfo, setPdfInfo] = useState([]);
    const viewer = useRef(null);

    useEffect(() => {
        CreateForm();
    }, [posted_quote]);
    

    const mappedProducts = products.map((product, index) => ({
      variableName: `${index + 1}`,
      ...product,
    }));

   
 async function CreateForm() {

  const url = `/Quote/quote-blank.pdf`
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
  var bytes = new Uint8Array(existingPdfBytes);
  const pdfDoc = await PDFDocument.load(bytes);

  const pages = pdfDoc.getPages();
  const page = pages[0];

  const invoiceID = posted_quote.Naturali_Invoice
  const date = posted_quote.InsertDate

  var subtotal = 0

  let y = 460.8;

  const name = customer.Contact_Name
  const phone = customer.Phone
  const email = customer.Email
  const street = customer.Address
  // const city = customer.City
  const state = customer.State
  const zipCode = customer.ZipCode
  const company = customer.Company
  const PO = variables.method
  const ref = user[0].SellerReference
  const tax = 7
  const estDate = '2023-5-4'
  const deliveryMethod = variables.shipVia
  const paymentTerms = variables.paymentTerms

  

//   page.drawText(`${no}`, { x: 472, y: 666, size: 16, color: rgb(1, 0.3, 0) })
  page.drawText(`${date}`, { x: 448, y: 688, size: 10 })
  page.drawText(`${invoiceID}`, { x: 514, y: 687, size: 12, color: rgb(1, 0.3, 0)})

  page.drawText(`${name}`, { x: 42, y: 626, size: 10 })
  page.drawText(`${phone}`, { x: 42, y: 612, size: 10 })
  page.drawText(`${email}`, { x: 42, y: 598, size: 10 })

  page.drawText(`${street}`, { x: 336, y: 626, size: 10 })
  page.drawText(`City, ${state}`, { x: 336, y: 612, size: 10 })
  page.drawText(`${zipCode}`, { x: 336, y: 598, size: 10 })

  page.drawText(`${company}`, { x: 40, y: 508, size: 10 })
  page.drawText(`${PO}`, { x: 162, y: 508, size: 10 })
  page.drawText(`${ref}`, { x: 272, y: 508, size: 10 })
  page.drawText(`${estDate}`, { x: 354, y: 508, size: 10 }) 
  page.drawText(`${deliveryMethod}`, { x: 439, y: 508, size: 10 }) 
  page.drawText(`${paymentTerms}`, { x: 524, y: 508, size: 10 }) 


// //This line uses the forEach method to iterate over each key-value pair in the array created by Object.
// //entries. For each iteration, the key (variableName) and value (element) are destructured from the pair and
// //passed as arguments to the callback function.

mappedProducts.forEach((product, index) => {
  const { variableName } = product;

  subtotal = subtotal + product.price * product.quantity

  page.drawText(`${product.quantity}`, { x: 46, y, size: 10 });
  page.drawText(`Units`, { x: 76, y, size: 10 });
  page.drawText(`${product.prodID}`, { x: 134, y, size: 10 });
  page.drawText(`${product.prodName} - ${product.finish}`, { x: 210, y, size: 10 });
  page.drawText(`${product.price}`, { x: 470, y, size: 10 });
  page.drawText(`${product.price * product.quantity}`, { x: 528, y, size: 10 });
  y -= 14;
});

  page.drawText(`${subtotal}`, { x: 528, y: 272, size: 10 });
  page.drawText(`(${tax} %)`, { x: 454, y: 249, size: 12 });
  page.drawText(`${(subtotal * tax / 100).toFixed(2)}`, { x: 528, y: 247, size: 10 });
  page.drawText(`$ ${(subtotal + (subtotal * tax / 100)).toFixed(2)}`, { x: 516, y: 222, size: 12 });


  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  
  setPdfInfo(URL.createObjectURL(blob));

  // const fileName = `${no}.pdf`;
  // const filePath = `C:\Users\Keki\Desktop\Naturalistone\Naturalistone\client\public\DeliveryNote/`;
  // const fullFilePath = filePath + fileName;
  
  // saveAs(blob, fullFilePath);
  
  };
  return (
  <>
    {
      Object.entries(posted_quote).length ?
      posted_quote.Naturali_Invoice && posted_quote.InsertDate ?
      <Box h={'85vh'} >
        {<iframe width={'100%'} height={'100%'} title="quote-blank" src={pdfInfo} ref={viewer} type="application/pdf" />}
      </Box>
      :
      <Center ml={'16vw'} w={'84vw'} bg={'web.bg'} h={'92vh'}>
        <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
      </Center>
      :
      <Center ml={'16vw'} w={'84vw'} bg={'web.bg'} h={'92vh'}>
        <Spinner thickness={'4px'} size={'xl'} color={'logo.orange'}/>
      </Center>
    }
  </>
  )
  };
export default CreatedQuotePdf
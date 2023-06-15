import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { PDFDocument, rgb, degrees } from 'pdf-lib';
import { Box, Center, Spinner, Button } from '@chakra-ui/react';
import approvalPic from '../../../assets/pending_approval.png'
import axios from 'axios';


const CreatedQuotePdf = ({variables, user, customer, project, handleChangeEmail, updatePdf, authFlag}) => {

    const posted_quote = useSelector(state => state.posted_quote)
    let invoiceID = posted_quote.Naturali_Invoice
    const date = posted_quote.InsertDate
    const [pdfInfo, setPdfInfo] = useState([]);
    const viewer = useRef(null);
    const mappedProducts =  posted_quote.parsedProducts

  console.log(posted_quote)


    useEffect(() => {
        CreateForm();
    }, [posted_quote]);

    async function waitUntilMappedProductsExists() { //esta promesa espera que se llene el estado de 
      return new Promise((resolve) => {              //posted_quote para poder captar los productos correctamente
        const checkMappedProducts = () => {
          if (Array.isArray(mappedProducts)) {
            resolve();
          } else {
            setTimeout(checkMappedProducts, 100); // Esperar 100ms antes de volver a verificar 
          }
        };
    
        checkMappedProducts();
      });
    }

async function CreateForm() {

  const url = `/Quote/quote-blank.pdf`
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
  var bytes = new Uint8Array(existingPdfBytes);
  const pdfDoc = await PDFDocument.load(bytes);

  const pages = pdfDoc.getPages();
  const page = pages[0];



  var subtotal = 0

  let y = 460.8;

  const name = customer.Contact_Name
  const phone = customer.Phone
  const email = customer.Email
  const street = project.Shipping_Address
  const city = project.City
  const state = project.State
  const zipCode = project.ZipCode
  const company = customer.Company
  const PO = variables.method
  const ref = user[0].SellerReference
  const tax = 7
  const estDate = variables.estDelivDate
  const deliveryMethod = variables.shipVia
  const paymentTerms = variables.paymentTerms

  const streetCustomer = customer.Address
  const cityCustomer = customer.City
  const stateCustomer = customer.State
  const zipCodeCustomer = customer.ZipCode

//   page.drawText(`${no}`, { x: 472, y: 666, size: 16, color: rgb(1, 0.3, 0) })
  page.drawText(`${date}`, { x: 448, y: 688, size: 10 })
  page.drawText(`${invoiceID}`, { x: 514, y: 687, size: 12, color: rgb(1, 0.3, 0)})

  page.drawText(`${name}`, { x: 42, y: 626, size: 10 })
  page.drawText(`${phone}`, { x: 42, y: 612, size: 10 })
  page.drawText(`${email}`, { x: 42, y: 598, size: 10 })

  page.drawText(street, { x: 336, y: 626, size: 10 })
  page.drawText(`${city }, ${state}`, { x: 336, y: 612, size: 10 })
  page.drawText(zipCode, { x: 336, y: 598, size: 10 })

  page.drawText(`${company}`, { x: 40, y: 508, size: 10 })
  page.drawText(`${PO}`, { x: 162, y: 508, size: 10 })
  page.drawText(`${ref}`, { x: 272, y: 508, size: 10 })
  page.drawText(`${estDate}`, { x: 354, y: 508, size: 10 }) 
  page.drawText(`${deliveryMethod}`, { x: 439, y: 508, size: 10 }) 
  page.drawText(`${paymentTerms}`, { x: 524, y: 508, size: 10 }) 

  // if(authFlag === true ) {
  //   const pngDims = pngImage.scale(0.12)
  //   const pngImage = await pdfDoc.embedPng(pngImageBytes)
  //   const pngImageBytes = await fetch(approvalPic).then((res) => res.arrayBuffer())
  //   page.drawImage(pngImage, {
  //     x: page.getWidth() / 2 - pngDims.width / 3 + 50,
  //     y: page.getHeight() / 7 - pngDims.height + 250,
  //     width: pngDims.width,
  //     height: pngDims.height,
  //     rotate: degrees(55)
  //   })
  // }

// //This line uses the forEach method to iterate over each key-value pair in the array created by Object.
// //entries. For each iteration, the key (variableName) and value (element) are destructured from the pair and
// //passed as arguments to the callback function.

await waitUntilMappedProductsExists();

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
  page.drawText(`$ ${(subtotal + (subtotal * tax / 100)).toFixed(2)}`, { x: 510, y: 222, size: 12 });

  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: 'application/pdf' });
  
  setPdfInfo(URL.createObjectURL(blob));
  
  // savePdfOnServer(pdfBytes, invoiceID);
  
  function readBlobAsBase64(pdfBlob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onloadend = function() {
        const base64String = reader.result.split(',')[1]; // Obtiene el contenido base64
        resolve(base64String);
      };
  
      reader.onerror = reject;
  
      reader.readAsDataURL(pdfBlob);
    });
  }

  updatePdf(readBlobAsBase64(blob))

  
  };
  
  async function savePdfOnServer(pdfBytes, invoiceID) {

    try {
      // Configurar el encabezado Content-Type para FormData
      axios.interceptors.request.use(function (config) {
        config.headers['Content-Type'] = 'multipart/form-data';
        return config;
      });
  
      const formData = new FormData();
      formData.append('pdfFile', new Blob([pdfBytes], { type: 'application/pdf' }), `${invoiceID}.pdf`);
      console.log('formData', formData);
     
      const response = await axios.post('/save-pdf', formData);
  
      if (response.status === 200) {
        console.log('PDF guardado en el servidor correctamente.');
        // Realizar cualquier acción adicional después de guardar el PDF en el servidor
      } else {
        console.error('Error al guardar el PDF en el servidor.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud al servidor:', error);
    }
  }
  
  
  return (
  <>
    {
      Object.entries(posted_quote).length ?
        posted_quote.Naturali_Invoice && posted_quote.InsertDate ?
        <Box h={'85vh'} >
        <Button
          size={'sm'}
          onClick={handleChangeEmail}
          colorScheme={'orange'}>
          Send Email
        </Button>
          {<iframe width={'100%'} height={'100%'} title="quote-blank" src={pdfInfo} ref={viewer} type="application/pdf" />}
        </Box>
        :
        <Center w={'84vw'} bg={'web.bg'} h={'92vh'}>
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
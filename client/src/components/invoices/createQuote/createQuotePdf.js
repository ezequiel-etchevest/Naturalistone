import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import { Box, Center, Spinner, Button, Flex } from "@chakra-ui/react";
import { states } from '../../../utils/eeuuStates'
import { formatTextForPdf, formatedPcs, getFontSize, getX, getXForExtPrice, getXForExtSubtotal, getXForExtTotal, getXForID, getXForPrice, getXForQuantity, getXForUM, getXPO, getXPaymentTerms, getXRef, parseThickness, parsedNumbers } from "../../../utils/xYfunctionsPdf";
import { savePdfOnServer } from "../../../utils/savePdfOnServer";
import { day0, month0, year } from "../../../utils/todayDate";
import SendEmailModal from "./createSendEmailQuote";

const CreatedQuotePdf = ({ formData, user, handleChangeEmail, setPdf }) => {
  const { variables, customer, project } = formData;

  const posted_quote = useSelector((state) => state.posted_quote);

  let invoiceID = posted_quote.Naturali_Invoice;
 
  
  const date =  `${month0}/${day0}/${year}`;
 
  const [pdfInfo, setPdfInfo] = useState([]);
  const mappedProducts = posted_quote.parsedProducts;

  useEffect(() => {
    CreateForm();
    }, [posted_quote]);

  async function waitUntilMappedProductsExists() {
    //esta promesa espera que se llene el estado de
    return new Promise((resolve) => {
      //posted_quote para poder captar los productos correctamente
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

  const stateNameToAbbreviation = (state) => {
    return states[state];
  }

  async function CreateForm() {
    const url = `/Quote/quote-blank.pdf`;
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    var bytes = new Uint8Array(existingPdfBytes);
    let pdfDoc = await PDFDocument.load(bytes);
    let pdfDoc2 = await PDFDocument.load(bytes);

    const form = pdfDoc.getForm()

    const fontTimes = await pdfDoc.embedFont(StandardFonts.TimesRoman)
    const fontHelvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
    const fontHelveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

    var subtotal = 0;

    let y = 462.8;

    const createNewPage = async () => {
      const [existingPage] = await pdfDoc.copyPages(pdfDoc2, [0])
      pdfDoc.addPage(existingPage)
      y = 462.8;
    };
    const estDateYear = variables.estDelivDate.split('-')[0]
    const estDateMonth = variables.estDelivDate.split('-')[1]
    const estDateDay = variables.estDelivDate.split('-')[2]

    const name = customer.Contact_Name;
    const phone = customer.Phone;
    const email = customer.Email;
    const custStreet = customer.Billing_Address;
    const custCity = customer.Billing_City;
    const custState = customer.Billing_State;
    const custZipCode = customer.Billing_ZipCode;
    const projectName = project.ProjectName;
    const street = project.Shipping_Address;
    const city = project.Shipping_City;
    const state = project.Shipping_State;
    const zipCode = project.Shipping_ZipCode;
    const company = customer.Company;
    const PO = variables.method ? variables.method : '';
    const ref = user[0].SellerReference;
    const tax = 7;
    const estDate = `${estDateMonth}-${estDateDay}-${estDateYear}`;
    const deliveryMethod = variables.shipVia;
    const paymentTerms = variables.paymentTerms;
    const shippingPrice = variables.shippingFee ? Number(variables.shippingFee) : 0;
    const transferFee = variables.transferFee ? variables.transferFee : 0;
    const cratingFee = variables.cratingFee ? variables.cratingFee : 0;
    const discountRate = Number(customer.DiscountRate)
    const discountFactor = discountRate / 100;

    await waitUntilMappedProductsExists();
    const totalRows = mappedProducts?.length

    if(totalRows > 5) await createNewPage()
    const pages = pdfDoc.getPages();
    const page = pages[0];
    let productRows = 1;
    let productRowsBis = 1; 
    let currentPage = (productRows <= 5) ? pages[0] : pages[1]
    let productoPintado = true; // Variable para alternar el sombreado
    let currentRows = 1;
    let h
  {/*               Here Starts mapping for regular products             */}
    
    mappedProducts.forEach((product, index) => {
  
      let currentPage = (productRows <= 5) ? pages[0] : pages[1]

      currentRows = 1;

      if(productRowsBis > 5){
        y = 462.8
        productRowsBis = 1
      }
      
      const discountedPrice = product.price - product.price * discountFactor;
      const formattedExtPrice = parsedNumbers(discountedPrice * product.quantity)

      const firstFourLetters = product.material.substring(0, 4);
      const { variableName } = product;
      
      const x = getXForPrice(parsedNumbers(discountedPrice));
      const xQuantity = getXForQuantity(product.quantity)
      const xID = getXForID(firstFourLetters + product.prodID)
      const xExtPrice = getXForExtPrice((formattedExtPrice))
      const formatSize = (size) => {
        if (size?.includes('x') || size?.includes('X')) {
          const [first, second] = size.split(size.includes('x') ? 'x' : 'X');
          return `${first}"x${second}"`;
        } else {
          if(size !== null && size.length > 0){
            return `${size}"`;
          } else return ""
      }
      };
      subtotal = subtotal + discountedPrice * product.quantity;

      currentPage.drawText(`${product.quantity.toLocaleString('en-US')}`, { x: xQuantity, y, size: 9, font: fontTimes });

      currentPage.drawText(`${product.type === "Tile"  || product.type === "Mosaic" ? "Sqft" : ""}`, { x: 79.5, y, size: 9, font: fontTimes});

      currentPage.drawText(`${ product.prodID !== undefined ? firstFourLetters + product.prodID : ""}`, { x: xID, y, size: 9, font:fontTimes });
      currentPage.drawText(`$ ${parsedNumbers(discountedPrice)}`, { x, y, size: 9, font: fontTimes });
      currentPage.drawText(`$ ${(formattedExtPrice)}`, { x: xExtPrice, y, size: 9, font: fontTimes });
      
      let text = `Special Order: ${product.material} ${product.type} ${product.prodName} ${product.finish} ${formatSize(product.size)}x${parseThickness(product.thickness)}  ${formatedPcs(product.type, product.quantity, product.size)}`
      let text2 = `${product.notes || ''}${(product.notes && product.leadTime) ? ' ' : ''}${product.leadTime || ''}`;

    
      let maxLength = 64;
      
      const drawTextWithWrap = (text, x, y, maxLineLength) => {
        const formattedLines = formatTextForPdf(text, maxLineLength).split('\n');
        for (let i = 0; i < formattedLines.length; i++) {
          currentPage.drawText(formattedLines[i], { x, y, size: 9, font: fontTimes });
          y -= 14; // Ajusta este valor según el espacio entre líneas
        }
        return y;
      };
      
      if (text.length > maxLength || (text.length <= maxLength && text2.length)) {
        // Dibuja el primer texto y ajusta la coordenada y
        y = drawTextWithWrap(text + " " + text2, 198, y, maxLength);
        currentRows = 2;
      } else {
        // Dibuja el primer texto si es posible
        y = drawTextWithWrap(text, 198, y, maxLength);
      
        // Si hay un segundo texto, dibújalo en la línea siguiente
        if (text2.length) {
          y = drawTextWithWrap(text2, 198, y, maxLength);
          currentRows = 2;
        } else {
          currentRows = 1;
        }
      }

      // Alternar el sombreado en productos
      // if (productoPintado) {
      //   if(currentRows == 1){
      //     h = 15;
      //   } else {
      //     h = 30;
      //   } 

      //   const colorTranslucido = rgb(0.9, 0.9, 0.9, 0.5);
      //   currentPage.drawRectangle({x: 37,y: y - 24, width: 34,height: h,color: colorTranslucido,});
      //   currentPage.drawRectangle({ x: 73, y: y - 24, width: 30, height: h, color: colorTranslucido,});
      //   currentPage.drawRectangle({ x: 104.6, y: y - 24, width: 88, height: h, color: colorTranslucido,});
      //   currentPage.drawRectangle({ x: 194, y: y - 24, width: 259.5, height: h, color: colorTranslucido,});
      //   currentPage.drawRectangle({ x: 455.5, y: y - 24, width: 56.2, height: h, color: colorTranslucido,});
      //   currentPage.drawRectangle({ x: 455.5, y: y - 24, width: 56.2, height: h, color: colorTranslucido,});
      //   currentPage.drawRectangle({ x: 514, y: y - 24, width: 61, height: h, color: colorTranslucido,});
      // }
      // Agrega un espacio adicional después del bloque de texto
      y -= 5

      productRows++
      productRowsBis++
      productoPintado = !productoPintado; // Alternar el sombreado
    });
  //   let text = `Special Order: ${product.material} ${product.type} ${product.prodName} ${product.finish} ${formatSize(product.size)}x${parseThickness(product.thickness)}  ${formatedPcs(product.type, product.quantity, product.size)}`
  //   let text2 = `${product.notes} ${product.leadTime}`
  //   let maxLength = 70;
  //   if (text.length > maxLength) {
  //     const formattedLines = formatTextForPdf(text, maxLength).split('\n');
    
  //     for (let i = 0; i < formattedLines.length; i++) {
  //       currentPage.drawText(formattedLines[i], { x: 198, y, size: 9, font: fontTimes });
  //       if(i === formattedLines.length - 1) {
  //         y -= 15;
  //       } else {
  //         y -= 13;
  //     }}
  //   } else {
  //     currentPage.drawText(text, { x: 198, y, size: 9, font: fontTimes });
  //     y -= 15;
  //   }
  //   productRows++
  //   productRowsBis++

  // });
  {/*               Here FINISH mapping for regular products             */}

  {/*               Here Starts mapping for Special products             */}

    // formData?.specialProducts.forEach((product, index) => {
    //   let currentPage = (productRows <= 5) ? pages[0] : pages[1]
   
    //   if(productRowsBis > 5){
    //     y = 462.8
    //     productRowsBis = 1
    //   }

    //   const discountedPrice = product.price - product.price * discountFactor;
    //   const formattedExtPrice = parsedNumbers(discountedPrice * product.quantity)

    //   const x = getXForPrice(parsedNumbers(discountedPrice));
    //   const xQuantity = getXForQuantity(product.quantity)
    //   const xExtPrice = getXForExtPrice((formattedExtPrice))
    //   const formatSize = (size) => {
    //     if (size.includes('x') || size.includes('X')) {
    //       const [first, second] = size.split(size.includes('x') ? 'x' : 'X');
    //       return `${first}"x${second}"`;
    //     } else {
    //       return `${size}"`;
    //     }
    //   };

    //   subtotal = subtotal + discountedPrice * product.quantity;

    //   currentPage.drawText(`${(product.quantity).toLocaleString('en-US')}`, { x: xQuantity, y, size: 9, font:fontTimes });
      
    //   currentPage.drawText(`${product.type === "Tile"  || product.type === "Mosaic" ? "Sqft" : ""}`, { x: 79.5, y, size: 9, font:fontTimes }); // en esta linea tiene que ser condicional dependiendo si es tile o slab

    //   currentPage.drawText(`$ ${parsedNumbers(discountedPrice)}`, { x, y, size: 9, font:fontTimes });
    //   currentPage.drawText(`$ ${(formattedExtPrice)}`, {
    //     x: xExtPrice,
    //     y,
    //     size: 9, font:fontTimes,
    //   });
    //   const text = `Special Order: ${product.material} ${product.type} ${product.prodName} ${product.finish} ${formatSize(product.size)}x${parseThickness(product.thickness)}  ${formatedPcs(product.type, product.quantity, product.size)}`
    //   const maxLength = 52;

    //   if (text.length > maxLength) {
    //     const formattedLines = formatTextForPdf(text, maxLength).split('\n');
      
    //     for (let i = 0; i < formattedLines.length; i++) {
    //       currentPage.drawText(formattedLines[i], { x: 198, y, size: 9, font:fontTimes });
    //       if(i === formattedLines.length - 1) {
    //         y -= 15;
    //       } else {
    //         y -= 13;
    //     }}
    //   } else {
    //     currentPage.drawText(text, { x: 198, y, size: 9, font:fontTimes });
    //     y -= 15
    //   }
    //   productRows++
    //   productRowsBis++
    // });

  {/*               Here FINISH mapping for Special products             */}

  if(totalRows > 5) currentPage = pages[1]
  
  if(shippingPrice !== 0){
    currentPage.drawText("Shipping - Delivery:", { x: 198, y, size: 9, font: fontTimes });
    currentPage.drawText(`$ ${parsedNumbers(shippingPrice)}`, { x: getXForExtPrice(parsedNumbers(shippingPrice)), y, size: 9, font: fontTimes });
  y -= 14
  }
  if(transferFee !== 0){
    currentPage.drawText("Transfer fee:", { x: 198, y, size: 9, font: fontTimes });
    currentPage.drawText(`$ ${parsedNumbers(transferFee)}`, { x: getXForExtPrice(parsedNumbers(transferFee)), y, size: 9, font: fontTimes });
    y -= 14
  }
  if(cratingFee !== 0){
    currentPage.drawText("Crating fee:", { x: 198, y, size: 9, font: fontTimes });
    currentPage.drawText(`$ ${parsedNumbers(cratingFee)}`, { x: getXForExtPrice(parsedNumbers(cratingFee)), y, size: 9, font: fontTimes });
    y -= 14
  }


    const taxValue = ((subtotal * tax) / 100)
  // este forEach nos permite replicar la informacion comun a todas las paginas del pdf.
    pages.forEach(p => {
      p.drawText(`${date}`, { x: 447, y: 687, size: 10, font:fontHelvetica });
      p.drawText(`${invoiceID}`, { x: 528, y: 687, size: 10, font:fontHelvetica });

      p.drawText(`${company}`, { x: 42, y: 626, size: 10, font:fontHelvetica });
      p.drawText(`${name}`, { x: 42, y: 612, size: 10, font:fontHelvetica });
      p.drawText(`${phone}`, { x: 42, y: 598, size: 10, font:fontHelvetica });
      // p.drawText(`${email}`, { x: 42, y: 582, size: 10 });
      p.drawText(`${custStreet}, ${custCity}, ${stateNameToAbbreviation(custState)} ${custZipCode}`, { x: 42, y: 582, size: 10, font:fontHelvetica });

      // p.drawText(projectName, { x: 336, y: 626, size: 10 });
      if(variables.shipVia !== 'Pick up'){
        p.drawText(street, { x: 336, y: 626, size: 10, font:fontHelvetica });
        p.drawText(`${city}, ${stateNameToAbbreviation(state)} ${zipCode}`, { x: 336, y: 612, size: 10, font:fontHelvetica });
      }
      p.drawText(`${projectName.length > 18 ? projectName.substring(0, 18 - 3) + '...' : projectName}`, { x:getXRef(projectName), y: 507, size: 9, font:fontHelvetica });
      p.drawText(`${PO.length > 18 ? PO.substring(0, 18 - 3) + '...' : PO}`, { x: getXPO(PO), y: 507, size: 9, font:fontHelvetica});
      p.drawText(`${ref}`, { x: 272, y: 507, size: 9, font:fontHelvetica});
      p.drawText(`${estDate}`, { x: 351, y: 507, size: 9, font:fontHelvetica });
      p.drawText(`${deliveryMethod}`, { x: 439, y: 507, size: 9, font:fontHelvetica });
      p.drawText(`${paymentTerms.length > 17 ? paymentTerms.substring(0, 17 - 3) + '...' : paymentTerms}`, { x: getXPaymentTerms(paymentTerms), y: 507, size: 9, font:fontHelvetica});

      p.drawText(`$ ${parsedNumbers(subtotal + shippingPrice )}`, { x: getXForExtSubtotal(parsedNumbers(subtotal + shippingPrice)), y: 272, size: 10, font:fontHelvetica});
      p.drawText(`( ${tax} %)`, { x: 454, y: 248.6, size: 12, font:fontHelveticaBold });
      p.drawText(`$ ${parsedNumbers(taxValue)}`, {
        x: getXForExtSubtotal(parsedNumbers(taxValue)),
        y: 247,
        size: 10,
      });
      
      p.drawText(`$ ${parsedNumbers(subtotal + shippingPrice + cratingFee + transferFee + taxValue)}`, {
        x: getXForExtTotal(parsedNumbers(subtotal + shippingPrice + cratingFee + transferFee + taxValue)),
        y: 222,
        size: 12,
      });
      })

    if(formData.quote.notes.length){
      page.drawText("Notes:", { x: 42, y: 274, size: 9, font: fontTimes });
      // page.drawText("Notes:", { x: 156, y: 318, size: 9, font: fontTimes });

      const notes = form.createTextField('notes');
      notes.setText(formData.quote.notes);
      // x: 197, y: 290,
      notes.addToPage(page, { x: 70, y: 254.2,
                              width: 253,
                              height: 30,
                              textColor: rgb(0, 0, 0),
                              borderColor: rgb(0, 0, 0),
                              borderWidth: 0,
                              rotate: degrees(0),
                              font: fontTimes,
                              textAlign: 'left',
                              verticalAlign: 'top',
                             });
      notes.setFontSize(8);
      notes.enableMultiline();
      notes.enableReadOnly()
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const newFile = new File([blob], `Naturalistone-Invoice_${invoiceID}.pdf`, { type: "application/pdf", lastModified: date });

    
    setPdfInfo(URL.createObjectURL(blob));

    savePdfOnServer(pdfBytes, invoiceID);
    setPdf(newFile)
  }

  return (
    <>
      {Object.entries(posted_quote).length ? (
        posted_quote.Naturali_Invoice && posted_quote.InsertDate ? (
      <Box h={"98vh"} w={"100%"} display="flex" flexDirection="row">          
        <Box flex="1" w={"100%"} position="relative">
          <Box
            as="object"
            data={pdfInfo}
            type="application/pdf"
            width="94%"
            height="100%"
            ml={'1vw'}
          />
        </Box>
                
        <Button
          size={"sm"}
          onClick={handleChangeEmail}
          colorScheme={"orange"}
          mb={"2vh"}
          alignSelf="flex-end"  
        >
          Send Email
        </Button>
                
        </Box>
        ) : (
          <Center>
            <Spinner thickness={"4px"} size={"xl"} color={"logo.orange"} />
          </Center>
        )
      ) : (
        <Center>
          <Spinner thickness={"4px"} size={"xl"} color={"logo.orange"} />
        </Center>
      )}
    </>
  );
};

export default CreatedQuotePdf;

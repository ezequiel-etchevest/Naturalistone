import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import { Box, Center, Spinner, Button, Flex } from "@chakra-ui/react";
import { states } from '../../../utils/eeuuStates'
import { formatTextForPdf, getFontSize, getX, getXForExtPrice, getXForExtSubtotal, getXForExtTotal, getXForID, getXForPrice, getXForQuantity, getXForUM, getXPO, getXPaymentTerms, getXRef, parseThickness, parsedNumbers } from "../../../utils/xYfunctionsPdf";
import { savePdfOnServer } from "../../../utils/savePdfOnServer";
import { day0, month0, year } from "../../../utils/todayDate";

const CreatedQuotePdf = ({ formData, user, handleChangeEmail }) => {
  const { variables, customer, project } = formData;

  const posted_quote = useSelector((state) => state.posted_quote);

  let invoiceID = posted_quote.Naturali_Invoice;
  const date =  `${year}-${month0}-${day0}`;

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

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

    var subtotal = 0;

    let y = 460.8;

    const createNewPage = async () => {
      const [existingPage] = await pdfDoc.copyPages(pdfDoc2, [0])
      pdfDoc.addPage(existingPage)
      y = 460.8;
    };

    const name = customer.Contact_Name;
    const phone = customer.Phone;
    const email = customer.Email;
    const projectName = project.ProjectName;
    const street = project.Shipping_Address;
    const city = project.Shipping_City;
    const state = project.Shipping_State;
    const zipCode = project.Shipping_ZipCode;
    const company = customer.Company;
    const PO = variables.method ? variables.method : '';
    const ref = user[0].SellerReference;
    const tax = 7;
    const estDate = variables.estDelivDate;
    const deliveryMethod = variables.shipVia;
    const paymentTerms = variables.paymentTerms;
    const shippingPrice = variables.shippingPrice ? variables.shippingPrice : 0;

    const discountRate = Number(customer.DiscountRate)
    const discountFactor = discountRate / 100;

    await waitUntilMappedProductsExists();
    const totalRows = mappedProducts?.length + formData?.specialProducts.length

    if(totalRows > 5) await createNewPage()
    const pages = pdfDoc.getPages();
    const page = pages[0];
    let productRows = 1;
    let productRowsBis = 1; 
    let currentPage = (productRows <= 5) ? pages[0] : pages[1]
  
  {/*               Here Starts mapping for regular products             */}
    
    mappedProducts.forEach((product, index) => {

      let currentPage = (productRows <= 5) ? pages[0] : pages[1]
  
      if(productRowsBis > 5){
        y = 460.8
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
        if (size.includes('x') || size.includes('X')) {
          const [first, second] = size.split(size.includes('x') ? 'x' : 'X');
          return `${first}"x${second}"`;
        } else {
          return `${size}"`;
        }
      };
      subtotal = subtotal + discountedPrice * product.quantity;

      currentPage.drawText(`${product.quantity.toLocaleString('en-US')}`, { x: xQuantity, y, size: 9 });

      currentPage.drawText(`${product.type === "Tile"  || product.type === "Mosaic" ? "Sqft" : ""}`, { x: 79.5, y, size: 9 });

      currentPage.drawText(`${ firstFourLetters + product.prodID}`, { x: xID, y, size: 9 });
      currentPage.drawText(`$ ${parsedNumbers(discountedPrice)}`, { x, y, size: 9 });
      currentPage.drawText(`$ ${(formattedExtPrice)}`, { x: xExtPrice, y, size: 9 });
      
      let text = `Special Order: ${product.material} ${product.type} ${product.prodName} ${product.finish} ${formatSize(product.size)}x${parseThickness(product.thickness)}Mm`
      let maxLength = 52;
      if (text.length > maxLength) {
        const formattedLines = formatTextForPdf(text, maxLength).split('\n');
      
        for (let i = 0; i < formattedLines.length; i++) {
          currentPage.drawText(formattedLines[i], { x: 198, y, size: 9 });
          if(i === formattedLines.length - 1) {
            y -= 18;
          } else {
            y -= 14;
        }}
      } else {
        currentPage.drawText(text, { x: 198, y, size: 9 });
        y -= 18;
      }
      productRows++
      productRowsBis++

    });

  {/*               Here FINISH mapping for regular products             */}

  {/*               Here Starts mapping for Special products             */}

    formData?.specialProducts.forEach((product, index) => {
      let currentPage = (productRows <= 5) ? pages[0] : pages[1]
   
      if(productRowsBis > 5){
        y = 460.8
        productRowsBis = 1
      }

      const discountedPrice = product.price - product.price * discountFactor;
      const formattedExtPrice = parsedNumbers(discountedPrice * product.quantity)

      const x = getXForPrice(parsedNumbers(discountedPrice));
      const xQuantity = getXForQuantity(product.quantity)
      const xExtPrice = getXForExtPrice((formattedExtPrice))
      const formatSize = (size) => {
        if (size.includes('x') || size.includes('X')) {
          const [first, second] = size.split(size.includes('x') ? 'x' : 'X');
          return `${first}"x${second}"`;
        } else {
          return `${size}"`;
        }
      };

      subtotal = subtotal + discountedPrice * product.quantity;

      currentPage.drawText(`${(product.quantity).toLocaleString('en-US')}`, { x: xQuantity, y, size: 9 });
      
      currentPage.drawText(`${product.type === "Tile"  || product.type === "Mosaic" ? "Sqft" : ""}`, { x: 79.5, y, size: 9 }); // en esta linea tiene que ser condicional dependiendo si es tile o slab

      currentPage.drawText(`$ ${parsedNumbers(discountedPrice)}`, { x, y, size: 9 });
      currentPage.drawText(`$ ${(formattedExtPrice)}`, {
        x: xExtPrice,
        y,
        size: 9,
      });
      const text = `Special Order: ${product.material} ${product.type} ${product.prodName} ${product.finish} ${formatSize(product.size)}x${parseThickness(product.thickness)}Mm`
      const maxLength = 52;

      if (text.length > maxLength) {
        const formattedLines = formatTextForPdf(text, maxLength).split('\n');
      
        for (let i = 0; i < formattedLines.length; i++) {
          currentPage.drawText(formattedLines[i], { x: 198, y, size: 9 });
          if(i === formattedLines.length - 1) {
            y -= 18;
          } else {
            y -= 14;
        }}
      } else {
        currentPage.drawText(text, { x: 198, y, size: 9 });
        y -= 18;
      }
      productRows++
      productRowsBis++
    });

  {/*               Here FINISH mapping for Special products             */}

  if(totalRows > 5) currentPage = pages[1]
  
  if(shippingPrice !== 0){
    currentPage.drawText("Shipping - Delivery:", { x: 198, y, size: 9 });
    currentPage.drawText(`$ ${parsedNumbers(shippingPrice)}`, { x: getXForExtPrice(parsedNumbers(shippingPrice)), y, size: 9 });
  }


    const taxValue = ((subtotal * tax) / 100)
  // este forEach nos permite replicar la informacion comun a todas las paginas del pdf.
    pages.forEach(p => {
      p.drawText(`${date}`, { x: 447, y: 687, size: 10 });
      p.drawText(`${invoiceID}`, { x: 528, y: 687, size: 10 });

      p.drawText(`${company}`, { x: 42, y: 626, size: 10 });
      p.drawText(`${name}`, { x: 42, y: 612, size: 10 });
      p.drawText(`${phone}`, { x: 42, y: 598, size: 10 });
      p.drawText(`${email}`, { x: 42, y: 582, size: 10 });

      // p.drawText(projectName, { x: 336, y: 626, size: 10 });
      p.drawText(street, { x: 336, y: 626, size: 10 });
      p.drawText(`${city}, ${stateNameToAbbreviation(state)} ${zipCode}`, { x: 336, y: 612, size: 10 });

      p.drawText(`${projectName.length > 18 ? projectName.substring(0, 18 - 3) + '...' : projectName}`, { x:getXRef(projectName), y: 507, size: 10 });
      p.drawText(`${PO.length > 18 ? PO.substring(0, 18 - 3) + '...' : PO}`, { x: getXPO(PO), y: 507, size: 10});
      p.drawText(`${ref}`, { x: 272, y: 507, size: getFontSize(ref) });
      p.drawText(`${estDate}`, { x: 351, y: 507, size: 10 });
      p.drawText(`${deliveryMethod}`, { x: 439, y: 507, size: 10 });
      p.drawText(`${paymentTerms.length > 17 ? paymentTerms.substring(0, 17 - 3) + '...' : paymentTerms}`, { x: getXPaymentTerms(paymentTerms), y: 507, size: 10});

      p.drawText(`$ ${parsedNumbers(subtotal + shippingPrice )}`, { x: getXForExtSubtotal(parsedNumbers(subtotal + shippingPrice)), y: 272, size: 10  });
      p.drawText(`(${tax} %)`, { x: 454, y: 249, size: 12 });
      p.drawText(`$ ${parsedNumbers(taxValue)}`, {
        x: getXForExtSubtotal(parsedNumbers(taxValue)),
        y: 247,
        size: 10,
      });
      
      p.drawText(`$ ${parsedNumbers(subtotal + shippingPrice + taxValue)}`, {
        x: getXForExtTotal(parsedNumbers(subtotal + shippingPrice + taxValue)),
        y: 222,
        size: 12,
      });
      })

    if(formData.quote.notes.length){
      page.drawText("Notes:", { x: 156, y: 328, size: 9 });
      const notes = form.createTextField('notes');
      notes.setText(formData.quote.notes);
      notes.addToPage(page, { x: 197, y: 290,
                              width: 253,
                              height: 50,
                              textColor: rgb(0, 0, 0),
                              borderColor: rgb(0, 0, 0),
                              borderWidth: 0,
                              rotate: degrees(0),
                              font: font,
                              textAlign: 'left',
                              verticalAlign: 'top',
                             });
      notes.setFontSize(10);
      notes.enableMultiline();
      notes.enableReadOnly()
    }
                          
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });

    setPdfInfo(URL.createObjectURL(blob));

    // savePdfOnServer(pdfBytes, invoiceID);
  }

  return (
    <>
      {Object.entries(posted_quote).length ? (
        posted_quote.Naturali_Invoice && posted_quote.InsertDate ? (
          <Box h={"100vh"} w={"100%"}>
            <Button
              size={"sm"}
              onClick={handleChangeEmail}
              colorScheme={"orange"}
              mb={"1.5vw"}
              hidden={true}
            >
              Send Email
            </Button>
            <Flex h="100%" flexDir="row">
              <Box
                as="object"
                data={pdfInfo}
                type="application/pdf"
                width="82%"
                height="90%"
                position="relative"
                ml={"3vw"}
              />
            </Flex>
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
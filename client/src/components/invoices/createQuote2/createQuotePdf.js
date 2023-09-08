import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import { Box, Center, Spinner, Button, Flex } from "@chakra-ui/react";


const CreatedQuotePdf = ({ formData, user, handleChangeEmail }) => {
  const { variables, customer, project, specialProducts } = formData;

  const posted_quote = useSelector((state) => state.posted_quote);

  let invoiceID = posted_quote.Naturali_Invoice;
  const date = posted_quote.InsertDate;

  const [pdfInfo, setPdfInfo] = useState([]);
  const viewer = useRef(null);
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
  const states = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA', 
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA', 
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY'
  }
  const maxChars = 21.8;
  const charWidth = 10;

  const stateNameToAbbreviation = (state) => {
    return states[state]; 
  }
  const getXForExtPrice = (extPrice) => {

    const length = extPrice.toString().length;

    if(length === 1) return 558;
    if(length === 2) return 553;
    if(length === 3) return 548;
    if(length === 4) return 533;
    if(length === 5) return 530;
    if(length === 6) return 527;
    if(length === 7) return 524;
    if(length > 7) return 518;
  }

  const getXForPrice = (price) => {

    const length = price.toString().length;

    if(length === 1) return 490;
    if(length === 2) return 485;
    if(length === 3) return 480;
    if(length === 4) return 475;
    if(length > 4) return 470;

    return 475; // valor por defecto
  }

  const getXForID = (price) => {

    const length = price.toString().length;

    if(length === 3) return 140;
    if(length === 4) return 136;
    if(length > 4) return 132;
  }

  const getXForQuantity = (quantity) => {

    const length = quantity.toString().length;

    if(length === 1) return 51;
    if(length === 2) return 49;
    if(length === 3) return 47;
    if(length === 4) return 45;
    if(length > 4) return 43;

    return 43; // valor por defecto
  }

  const getXForUM = (um) => {
    if(um === "Tile" || um === "Sqft") return 77;
    else return 76;
  }

  const getX = (text) => {

    const textWidth = text.length * charWidth;
    
    // Alinear a la izquierda dentro del espacio
    const x = (maxChars * charWidth - textWidth);
    console.log(x)
    return x; 
  }
  
  async function CreateForm() {
    const url = `/Quote/quote-blank.pdf`;
    const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
    var bytes = new Uint8Array(existingPdfBytes);
    const pdfDoc = await PDFDocument.load(bytes);

    const form = pdfDoc.getForm()

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const pages = pdfDoc.getPages();
    const page = pages[0];

    var subtotal = 0;

    let y = 460.8;

    const name = customer.Contact_Name;
    const phone = customer.Phone;
    const email = customer.Email;
    const projectName = project.ProjectName;
    const street = project.Shipping_Address;
    const city = project.Shipping_City;
    const state = project.Shipping_State;
    const zipCode = project.Shipping_ZipCode;
    const company = customer.Company;
    const PO = variables.method;
    const ref = user[0].SellerReference;
    const tax = 7;
    const estDate = variables.estDelivDate;
    const deliveryMethod = variables.shipVia;
    const paymentTerms = variables.paymentTerms;

    // const streetCustomer = customer.Address
    // const cityCustomer = customer.City
    // const stateCustomer = customer.State
    // const zipCodeCustomer = customer.ZipCode

    //   page.drawText(`${no}`, { x: 472, y: 666, size: 16, color: rgb(1, 0.3, 0) })
    page.drawText(`${date}`, { x: 447, y: 687, size: 10 });
    page.drawText(`${invoiceID}`, { x: 528, y: 687, size: 10 });

    page.drawText(`${company}`, { x: 42, y: 626, size: 10 });
    page.drawText(`${name}`, { x: 42, y: 612, size: 10 });
    page.drawText(`${phone}`, { x: 42, y: 598, size: 10 });
    page.drawText(`${email}`, { x: 42, y: 582, size: 10 });

    page.drawText(projectName, { x: 336, y: 626, size: 10 });
    page.drawText(street, { x: 336, y: 612, size: 10 });
    page.drawText(`${city}, ${stateNameToAbbreviation(state)} ${zipCode}`, { x: 336, y: 598, size: 10 });

    page.drawText(`${company}`, { x: getX(company), y: 507, size: 10 });
    page.drawText(`${PO}`, { x: getX(PO), y: 507, size: 10 });
    page.drawText(`${ref}`, { x: 272, y: 507, size: 10 });
    page.drawText(`${estDate}`, { x: 351, y: 507, size: 10 });
    page.drawText(`${deliveryMethod}`, { x: 439, y: 507, size: 10 });
    page.drawText(`${paymentTerms}`, { x: 524, y: 507, size: 10 });

    // //This line uses the forEach method to iterate over each key-value pair in the array created by Object.
    // //entries. For each iteration, the key (variableName) and value (element) are destructured from the pair and
    // //passed as arguments to the callback function.

    await waitUntilMappedProductsExists();

  {/*               Here Starts mapping for regular products             */}  

    mappedProducts.forEach((product, index) => {

      const { variableName } = product;
      const x = getXForPrice(product.price);
      const xType = getXForUM(product.type)
      const xQuantity = getXForQuantity(product.quantity)
      const xID = getXForID(product.prodID)
      const xExtPrice = getXForExtPrice((product.price * product.quantity))

      subtotal = subtotal + product.price * product.quantity;

      page.drawText(`${product.quantity}`, { x: xQuantity, y, size: 9 });

      page.drawText(`${product.type === "Tile" ? "Sqft" : "Units"}`, { x: xType, y, size: 9 });

      page.drawText(`${product.prodID}`, { x: xID, y, size: 9 });

      page.drawText(`${product.price.toLocaleString('en-US')}`, { x, y, size: 9 });
      page.drawText(`${(product.price * product.quantity).toLocaleString('en-US')}`, { x: xExtPrice, y, size: 9 });
      const text = `Special Order: ${product.prodName} ${product.type} ${product.material} ${product.size} ${product.thickness} ${product.finish}`
      const maxLength = 52;

      if (text.length > maxLength) {
        const firstPart = text.substring(0, maxLength);
        const secondPart = text.substring(maxLength);
        page.drawText(firstPart, { x: 198, y, size: 9 });

        y -= 14; // Ajusta el valor de 'y' para dejar espacio entre las partes

        page.drawText(secondPart, { x: 198, y, size: 9 });
      } else {
        page.drawText(text, { x: 198, y, size: 9 });
      }
      y -= 18;
    });


    
  {/*               Here FINISH mapping for regular products             */}  

  
  {/*               Here Starts mapping for Special products             */}  
  
    formData?.specialProducts.forEach((product, index) => {

      const x = getXForPrice(product.price);
      const xType = getXForUM(product.um)
      const xQuantity = getXForQuantity(product.quantity)
      const xExtPrice = getXForExtPrice((product.price * product.quantity))
      const formatSize = (size) => {
        if(size.includes('x')){
        const [first, second] = size.split("x");
        return `${first}"x${second}"`;
      } else return `${size}"`
    }
      const parseThickness = (thickness) => {

        // Caso 1 - 3/8
        if(thickness.includes('/')) {
          const [num1, num2] = thickness.split('/');
          return `${num1}/${num2}"`;
        }
      
        // Caso 2 - 1 1/4
        if(thickness.includes(' ')) {
          const [num1, num2] = thickness.split(' ');
          const [num3, num4] = num2.split('/');
          return `${num1} ${num3}/${num4}"`; 
        }
      
        // Caso 3 - Entero
        if(Number.isInteger(Number(thickness))) {
          return `${thickness}"`;
        }
      
        // Caso 4 - 6Mm
        if(thickness.includes('Mm')) {
          return thickness;
        }
      
      }
      
      subtotal = subtotal + product.price * product.quantity;

      page.drawText(`${product.quantity}`, { x: xQuantity, y, size: 9 });

      page.drawText(`${product.um}`, { x: xType, y, size: 9 }); // en esta linea tiene que ser condicional dependiendo si es tile o slab

      // page.drawText(`sp-1`, { x: 140, y, size: 9 });

      page.drawText(`${product.price.toLocaleString('en-US')}`, { x, y, size: 9 });
      page.drawText(`${(product.price * product.quantity).toLocaleString('en-US')}`, {
        x: xExtPrice,
        y,
        size: 9,
      });
      const text = `Special Order: ${product.material} ${product.type} ${product.prodName} ${product.finish} ${formatSize(product.size)}x${parseThickness(product.thickness)}`
      const maxLength = 52;

      if (text.length > maxLength) {
        const firstPart = text.substring(0, maxLength);
        const secondPart = text.substring(maxLength);
        page.drawText(firstPart, { x: 198, y, size: 9 });

        y -= 14; // Ajusta el valor de 'y' para dejar espacio entre las partes

        page.drawText(secondPart, { x: 198, y, size: 9 });
      } else {
        page.drawText(text, { x: 198, y, size: 9 });
      }
      y -= 18;
    });

  {/*               Here FINISH mapping for regular products             */}  


    page.drawText("Notes:", { x: 156, y: 328, size: 9 });
    const notes = form.createTextField('notes');
    notes.setText('');
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


    page.drawText(`${subtotal.toLocaleString('en-US')}`, { x: getXForExtPrice(subtotal), y: 272, size: 10  });
    page.drawText(`(${tax} %)`, { x: 454, y: 249, size: 12 });
    page.drawText(`${((subtotal * tax) / 100).toLocaleString('en-US')}`, {
      x: getXForExtPrice(((subtotal * tax) / 100)),
      y: 247,
      size: 10,
    });
    page.drawText(`$ ${(subtotal + (subtotal * tax) / 100).toLocaleString('en-US')}`, {
      x: 510,
      y: 222,
      size: 12,
    });






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

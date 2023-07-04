import { PDFDocument, rgb, degrees } from 'pdf-lib';
import { savePdfOnServer } from '../../../utils/savePdfOnServer';

export default function updateQuotePdf (formData, user, invoice){
  console.log({formData})
  const {variables, customer, project, products} = formData

  const parsedProducts = Object.entries(products)
    .flat()
    .filter((element) => typeof element === 'object')
    .map((product, index) => ({ variableName: `${index + 1}`, ...product }));
 
    let invoiceID = invoice[0].Naturali_Invoice
    const date = invoice[0].InvoiceDate.split('T')[0]

    const mappedProducts = parsedProducts

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

    async function createForm() {

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
  const projectName = project.ProjectName
  const street = project.Shipping_Address
  const city = project.Shipping_City
  const state = project.Shipping_State
  const zipCode = project.Shipping_ZipCode
  const company = customer.Company
  const PO = variables.method
  const ref = user[0].SellerReference
  const tax = 7
  const estDate = variables.estDelivDate
  const deliveryMethod = variables.shipVia
  const paymentTerms = variables.paymentTerms

  // const streetCustomer = customer.Address
  // const cityCustomer = customer.City
  // const stateCustomer = customer.State
  // const zipCodeCustomer = customer.ZipCode

//   page.drawText(`${no}`, { x: 472, y: 666, size: 16, color: rgb(1, 0.3, 0) })
  page.drawText(`${date}`, { x: 448, y: 688, size: 10 })
  page.drawText(`${invoiceID}`, { x: 514, y: 687, size: 12, color: rgb(1, 0.3, 0)})

  page.drawText(`${company}`, { x: 42, y: 626, size: 10 })
  page.drawText(`${name}`, { x: 42, y: 612, size: 10 })
  page.drawText(`${phone}`, { x: 42, y: 598, size: 10 })
  page.drawText(`${email}`, { x: 42, y: 582, size: 10 })

  page.drawText(projectName, { x: 336, y: 626, size: 10 })
  page.drawText(street, { x: 336, y: 612, size: 10 })
  page.drawText(`${city }, ${state}`, { x: 336, y: 598, size: 10 })
  page.drawText(zipCode, { x: 336, y: 582, size: 10 })

  page.drawText(`${company}`, { x: 40, y: 508, size: 10 })
  page.drawText(`${PO}`, { x: 162, y: 508, size: 10 })
  page.drawText(`${ref}`, { x: 272, y: 508, size: 10 })
  page.drawText(`${estDate}`, { x: 354, y: 508, size: 10 }) 
  page.drawText(`${deliveryMethod}`, { x: 439, y: 508, size: 10 }) 
  page.drawText(`${paymentTerms}`, { x: 524, y: 508, size: 10 }) 


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

  savePdfOnServer(pdfBytes, invoiceID);
  
    };
    return createForm()
  };
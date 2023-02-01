// import React, { useState } from 'react'
// import { Document, Page  } from 'react-pdf/dist/esm/entry.webpack'

// const PdfVisual = ({id}) => {
//     const [numPages, setNumPages] = useState(null)
//     const [pageNumber, setPageNumber] = useState(1)

//     let idpdf = toString(id)
//     let url = `/InvoiceNaturali/${idpdf}.pdf`

//   return(
//     <div className="PdfVisual">
//       <header className="PdfVisual-header">
//         {/* <Document file={`/invoices/${id}.pdf`} onLoadSuccess={onDocumentLoadDSuccess}> */}
//         <Document file={`data:application/pdf;base64/InvoiceNaturali/${idpdf}.pdf`} options={{workerSrc: 'pdf.worker.js'}}>
//           <Page height={'600'} pageNumber={pageNumber}/>
//         </Document>
//       </header>
//     </div>
//   )
// }

//  export default PdfVisual
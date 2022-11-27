import { useState } from "react";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';

 const PdfVisual = () => {
    const [ numPages, setNumPages ] = useState(null);
    const [ pageNumber, setPageNumber ] = useState(1);
    
    const onDocumentLoadSucces = ({ numPages }) => {
        setNumPages(numPages)
    }
    const goToPrevPage = () =>{
        setPageNumber(pageNumber-1 <= 1 ? 1 : pageNumber - 1)
    }

    const goToNextPage = () => {
        setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1 )
    }

    return(
        <>
        <Document
        file={'invoice_example.pdf'}
        onLoadSuccess={onDocumentLoadSucces}
        >
        <Page pageNumber={pageNumber}/>
        </Document>
        </>
    )
 }

 export default PdfVisual
import { degrees, PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import invoice from '../assets/invoice_example.pdf';


async function editPdf(JPG, invoice) {
    
    const url = invoice
    const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
    const jpgImageBytes = await fetch(JPG).then(res => res.arrayBuffer() )

    const pdfDoc = await PDFDocument.load(existingPdfBytes)
    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)
    const jpgDims = jpgImage.scale(0.5)
    const pages = pdfDoc.getPages()
    const firstPage= pages[0]
    
    firstPage.drawImage( jpgImage , {
        x: firstPage.getWith() / 4 - jpgDims.width / 2,
        y: firstPage.getHeight() / 2 - jpgDims.height / 2 + 250,
        width: jpgDims.width,
        height: jpgDims.height,
      })
      const pdfBytes = await pdfDoc.save()
}

export default editPdf


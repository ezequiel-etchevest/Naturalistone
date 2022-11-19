const { degrees, PDFDocument, rgb, StandardFonts } = require('pdf-lib')

async function createPdf() {
    const doc = await PDFDocument.create()
    doc.addPage()
    fs.writeFileSync("./output.pdf", await doc.save())
}


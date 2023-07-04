import axios from "axios";


export async function savePdfOnServer(pdfBytes, invoiceID) {

    try {
      const formData = new FormData();

      const version = await axios.get(`/s3/pdf/search/${invoiceID}`)
      
      const newVersion = (typeof version.data  !== "string" ?  (version.data.version + 1) : 0)
      

      formData.append('pdf', new Blob([pdfBytes], { type: 'application/pdf' }), `${invoiceID}v${newVersion}.pdf`)  
      
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
  
      const response = await axios.post(`/s3/uploadPdf/${invoiceID}`, formData, config);
  
      if (response.status === 200) {
        console.log('PDF guardado en S3 correctamente.');
        // Realizar cualquier acción adicional después de guardar el PDF en S3
      } else {
        console.error('Error al guardar el PDF en S3.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud al backend:', error);
    }
  }
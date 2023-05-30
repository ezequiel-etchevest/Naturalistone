import axios from 'axios';

const enviarPDFAlBackend = async (pdfBlob) => {
  try {
    // const url = '/guardar-pdf'; // Reemplaza con la URL de tu backend

    const formData = new FormData();

    const file = new Blob([pdfBlob], { type: 'application/pdf' });

    formData.append('pdf', file, 'archivo.pdf'); // Agrega el objeto Blob al formulario

    console.log(formData);
    const response = await axios.post(`/guardar-pdf/pdf`, formData, {
      maxContentLength: 50 * 1024 * 1024, // 50MB
    });

    if (response.status === 200) {
      console.log('PDF enviado al backend correctamente');
      // Realiza cualquier acción adicional después de enviar el PDF al backend
    } else {
      console.error('Error al enviar el PDF al backend');
      // Maneja el error según sea necesario
    }
  } catch (error) {
    console.error('Error al enviar el PDF al backend:', error);
    // Maneja el error según sea necesario
  }
};

export default enviarPDFAlBackend;

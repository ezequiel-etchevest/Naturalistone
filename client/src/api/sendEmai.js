import axios from 'axios'

export async function sendEmail(email) {
    try {
      const formData = new FormData()
      formData.append('data', JSON.stringify(email))
      
      const response = await axios.post('/email', formData, { 
        headers: { "Content-type": 'multipart/form-data' }
      });

    } catch (error) {
      console.log('soy error ispatch', error)
    }

}

export async function sendEmailSamples(email) {
  try {
  
    const response = await axios.post('/email/samples', email, {
      headers: {
        'Content-Type': 'application/json', // Tipo de contenido para el cuerpo
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Error sending email: ' + error.message);
  }
}

// export async function sendEmailCustomer(email) {
//   try {
//     console.log(email)
//     const response = await axios.post('/email/customer', email, {
//       headers: {
//         'Content-Type': 'application/json', // Tipo de contenido para el cuerpo
//       },
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error('Error sending email: ' + error.message);
//   }
// }
export async function sendEmailCustomer(email) {
  try {
    // Crear un objeto FormData
    const formData = new FormData();

    // Adjuntar los datos del correo al FormData
    formData.append('sellerEmail', email.sellerEmail);
    formData.append('htmlBody', email.htmlBody);
    formData.append('subject', email.subject);
    formData.append('clientEmail', email.clientEmail);
    formData.append('ccEmail', email.ccEmail);

    // Adjuntar los archivos al FormData
    email.attachments.forEach((attachment, index) => {
      formData.append('attachments', attachment); // Utiliza el mismo nombre de campo "attachments"
    });

    const response = await axios.post('/email/customer', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Cambiar el tipo de contenido a 'multipart/form-data'
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('Error sending email: ' + error.message);
  }
}

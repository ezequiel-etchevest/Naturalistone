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

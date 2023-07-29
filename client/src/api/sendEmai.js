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

export async function sendEmailSamples(formData) {
    try {
      const { data } = await axios.post('/email/samples', formData)
      return data
    } catch (error) {
      return error.data
    }
}
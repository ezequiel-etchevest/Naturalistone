import axios from 'axios'
export const SEND_EMAIL_CLIENT = 'SEND_EMAIL_CLIENT'

export function sendEmail(email, resolvePdf) {

  return async function(dispatch){
    try {

      const formData = new FormData()
      formData.append('pdfFile', resolvePdf, 'pdfFil')
     
      const response = await axios.post('/invoiceEmail', formData, { 
        headers: { "Content-type": 'multipart/form-data' }
      });

      const data = await axios.post('/invoiceEmail', email, {
          headers: {"Content-type": "application/json; charset=UTF-8"}
        });


      dispatch({
        type: SEND_EMAIL_CLIENT,
        payload: {}
      })


    } catch (error) {
      console.log('soy error ispatch', error)
    }
  }
}
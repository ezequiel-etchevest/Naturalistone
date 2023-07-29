import axios from 'axios'
export const SEND_EMAIL_CLIENT = 'SEND_EMAIL_CLIENT'
export const SEND_EMAIL_CLIENT_SAMPLES = 'SEND_EMAIL_CLIENT_SAMPLES'

export function sendEmail(email) {

  return async function(dispatch){
    try {

      const formData = new FormData()
      formData.append('data', JSON.stringify(email))
      
      const response = await axios.post('/email', formData, { 
        headers: { "Content-type": 'multipart/form-data' }
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

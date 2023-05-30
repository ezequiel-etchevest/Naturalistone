import { USStates } from "../components/customers/AutocompleteState";

export const validateCompletedInputs = (formData) =>{
  let errors = {}
  const regexNoNumber = /^[a-zA-Z\s!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]*$/;
  const regexNumberAndPlus = /^[\d+()\[\]-\s]*$/;
  const regexNumber = /^[0-9]+$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
  if(formData.Contact_Name !== ''){
    if(!regexNoNumber.test(formData.Contact_Name)) {
      errors.Contact_Name = 'must be a valid name'
    } 
  }
  if(formData.ZipCode !== ''){
    if(!regexNumber.test(formData.ZipCode)) {
      errors.ZipCode = 'Please enter a valid zip code'
    }
  }
  if(formData.Billing_ZipCode !== ''){
    if(!regexNumber.test(formData.Billing_ZipCode)) {
      errors.Billing_ZipCode = 'Please enter a valid zip code'
    }
  }

  if(formData.Phone !== ''){
    if(!regexNumberAndPlus.test(formData.Phone)) {
      errors.Phone = 'Please enter a valid Phone'
    } 
  }
  if(formData.Email !== ''){
    if(!regexEmail.test(formData.Email)){
      errors.Email = 'Please enter a valid email'
    }
  }

  if(formData.State !== ''){
    if(!USStates.includes(formData.State)) {
      errors.State = 'Please enter a valid state'
    }
  }
  if(formData.Billing_State !== ''){
    if(!USStates.includes(formData.Billing_State)) {
      errors.Billing_State = 'Please enter a valid state'
    }
  }

  if(formData.City !== '') {
    if(!regexNoNumber.test(formData.City)){
      errors.City = 'Please enter a valid City'
    }
  }
  if(formData.Billing_City !== '') {
    if(!regexNoNumber.test(formData.Billing_City)){
      errors.Billing_City = 'Please enter a valid City'
    }
  }
  

  return errors
}
                      
                      
export const validateEmptyInputs = (formData, progress) => {
  let errors = {}

  if(progress === 25){
    if(!formData.Contact_Name){
      errors.Contact_Name = 'Please enter your email'
      }
    if(!formData.Phone){
      errors.Phone = 'Please enter your phone'
    }
    if(!formData.Email){
      errors.Email = 'Please enter your email'
    }
    return errors  
  }
  if (progress === 50){
    if(!formData.Address){
      errors.Address = 'Please enter your address'
    }
    if(!formData.ZipCode){
      errors.ZipCode = 'Please enter your zip code'
    } 
    if(!formData.City){
      errors.City = 'Please enter a City'
    }
    if(!formData.State) {
      errors.State = 'Please enter a state'
    }
    return errors
  }
  if (progress === 75){

    if(!formData.Company){
      errors.Company = 'Please enter your company name'
    }
    if(!formData.DiscountID){
      errors.DiscountID = 'Please enter a discount'
    }
    if(!formData.Company_Position){
      errors.Company_Position = 'Please enter a company role'
    }
    return errors
  }
  if (progress === 100){
    if(!formData.Billing_Address){
      errors.Billing_Address = 'Please enter a billing address'
    }
    if(!formData.Billing_ZipCode){
      errors.Billing_ZipCode = 'Please enter a zip code'
    } 
    if(!formData.Billing_City){
      errors.Billing_City = 'Please enter a city'
    }
    if(!formData.Billing_State) {
      errors.Billing_State = 'Please enter a state'
    }
    return errors
  }
  

  if(!formData.Shipping_Address){
    errors.Shipping_Address = 'Please enter a Shipping_Address'
  } 
   return errors 
  
}
export const validateProject = (formData) =>{
  let errors = {}
  const regexNoNumber = /^[a-zA-Z\s!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]*$/;
  const regexNumberAndPlus = /^[\d+()\[\]-\s]*$/;
  const regexNumber = /^[0-9]+$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if(!formData.State) {
    errors.State = 'Please enter a state'
  } else if(!USStates.includes(formData.State)) {
    errors.State = 'Please enter a valid state'
  }
  if(!formData.ProjectName){
    errors.ProjectName = 'Please enter a ProjectName'
  }
  if(!formData.City){
    errors.City = 'Please enter a City'
  } else if(!regexNoNumber.test(formData.City)){
    errors.City = 'Please enter a valid City'
  }
  if(!formData.Shipping_Address){
    errors.Shipping_Address = 'Please enter a Shipping_Address'
  }
  if(!formData.ZipCode){
    errors.ZipCode = 'Please enter your zip code'
  } else if(!regexNumber.test(formData.ZipCode)) {
    errors.ZipCode = 'Please enter a valid zip code'
  }
   return errors
  }
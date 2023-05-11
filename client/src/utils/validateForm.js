import { USStates } from "../components/customers/AutocompleteState";

export const validate = (formData) =>{
    let errors = {}
    const regexNoNumber = /^[a-zA-Z\s!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]*$/;
    const regexNumberAndPlus = /^[\d+()\[\]-\s]*$/;
    const regexNumber = /^[0-9]+$/;
    const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if(!formData.Contact_Name){
        errors.Contact_Name = 'Please enter your email'
      } else if(!regexNoNumber.test(formData.Contact_Name)) {
        errors.Contact_Name = 'must be a valid name'
      } 
      if(!formData.Address){
        errors.Address = 'Please enter your address'
      }
      if(!formData.ZipCode){
        errors.ZipCode = 'Please enter your zip code'
      } else if(!regexNumber.test(formData.ZipCode)) {
        errors.ZipCode = 'Please enter a valid zip code'
      }
      if(!formData.Company){
        errors.Company = 'Please enter your company'
      }
      if(!formData.DiscountID){
        errors.DiscountID = 'Please enter a discountID'
      }
      if(!formData.Phone){
        errors.Phone = 'Please enter your phone'
      } else if(!regexNumberAndPlus.test(formData.Phone)) {
        errors.Phone = 'Please enter a valid Phone'
      }
      if(!formData.Email){
        errors.Email = 'Please enter your email'
      } else if(!regexEmail.test(formData.Email)){
        errors.Email = 'Please enter a valid email'
      }
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
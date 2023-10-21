import { USStates } from "./USStates"; 

// VALIDACIONES CUSTOMER FORM 
export const validateCompletedInputs = (formData) =>{
  let errors = {}
  const regexNoNumber = /^[a-zA-Z\s!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]*$/;
  const regexNumberAndPlus = /^[\d+()\[\]-\s]*$/;
  const regexNumber = /^[0-9]+$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
  if(formData.Contact_Name !== ''){
    if(!regexNoNumber.test(formData.Contact_Name)) {
      errors.Contact_Name = 'Please enter a valid name'
    } 
  }

  if(formData.Billing_ZipCode?.length){
    if(formData.Billing_ZipCode !== '' && formData.Billing_ZipCode !== "undefined"){
      if(!regexNumber.test(formData.Billing_ZipCode)) {
        errors.Billing_ZipCode = 'Please enter a valid zip code'
      }
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
  if(formData.Billing_State?.length){
    if(formData.Billing_State !== '' && formData.Billing_State != "undefined"){
      if(!USStates.includes(formData.Billing_State)) {
        errors.Billing_State = 'Please enter a valid state'
      }
    }
  }
  if(formData.Billing_City?.length){
    if(formData.Billing_City !== '' && formData.Billing_City != "undefined") {
      if(!regexNoNumber.test(formData.Billing_City)){
        errors.Billing_City = 'Please enter a valid City'
      }
    }
  }
  // if(formData.DiscountRate !== '') {
  //   const allowedValues = ['0', '5', '10', '15', 0, 5, 10, 15];
  //   if(!allowedValues.includes(formData.DiscountRate)){
  //     errors.DiscountRate = 'Valid discounts: 0, 5, 10, 15'
  //   }
  // }
    if (formData.Company_Position === '') {
      errors.Company_Position = 'Please enter a company Position'
    }
    if(formData.Company_Position !== "Home Owner" && formData.Company === '') {
        errors.Company = 'Please enter a company';
    }

  return errors
}

export const validateEmptyInputsCreateQuote = (formData) => {
  let errors = validateCompletedInputs(formData)
  
  if(!formData.Contact_Name || formData.Contact_Name === "undefined"){
    errors.Contact_Name = 'Please enter customer name'
    }
  if(!formData.Phone || formData.Phone === "undefined"){
    errors.Phone = 'Please enter phone number'
  }
  if(!formData.Email || formData.Email === "undefined"){
    errors.Email = 'Please enter email address'
  }
  if(!formData.Billing_Address || formData.Billing_Address === "undefined"){
    errors.Billing_Address = 'Please enter an address'
  }
  if(!formData.Billing_ZipCode || formData.Billing_ZipCode === "undefined"){
    errors.Billing_ZipCode = 'Please enter a zip code'
  } 
  if(!formData.Billing_City || formData.Billing_City === "undefined"){
    errors.Billing_City = 'Please enter a city'
  }
  if(!formData.Billing_State || formData.Billing_State === "undefined") {
    errors.Billing_State = 'Please enter a state'
  }
  if(!formData.Company || formData.Company === "undefined"){
    errors.Company = 'Please enter customer company name'
  }
  if(!formData.Company_Position || formData.Company_Position === "undefined"){
    errors.Company_Position = 'Please enter customer company position'
  }
return errors
}



export const validateEmptyInputs = (formData, progress) => {
  const regexNumber = /^[0-9]+$/;
  const regexNumberAndPlus = /^[\d+()\[\]-\s]*$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const regexNoNumber = /^[a-zA-Z\s!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]*$/;


  let errors = {}

  if(progress === 33.33){
    if(!formData.Contact_Name){
      errors.Contact_Name = 'Please enter customer name'
      }
    if(!formData.Phone){
      errors.Phone = 'Please enter phone number'
    }
    if(formData.Phone !== ''){
      if(!regexNumberAndPlus.test(formData.Phone)) {
        errors.Phone = 'Please enter a valid Phone'
    } 
  }
    if(!formData.Email){
      errors.Email = 'Please enter email address'
    }
    if(formData.Email !== ''){
      if(!regexEmail.test(formData.Email)){
        errors.Email = 'Please enter a valid email'
      }
  }
    return errors  
  }
  // if (progress === 50){
  //   if(!formData.Address){
  //     errors.Address = 'Please enter an address'
  //   }
  //   if(!formData.ZipCode){
  //     errors.ZipCode = 'Please enter a zip code'
  //   }
  //   if(formData.ZipCode.length){
  //     if(formData.ZipCode !== '' && formData.ZipCode !== "undefined"){
  //       if(!regexNumber.test(formData.ZipCode)) {
  //         errors.ZipCode = 'Please enter a valid zip code'
  //       }
  //   }
  // }
  //   if(!formData.City){
  //     errors.City = 'Please enter a city'
  //   }
  //   if(formData.City?.length){
  //     if(formData.City !== '' && formData.City != "undefined") {
  //       if(!regexNoNumber.test(formData.City)){
  //         errors.City = 'Please enter a valid City'
  //       }
  //   }
  // }
  //   if(!formData.State) {
  //     errors.State = 'Please enter a state'
  //   }
  //   return errors
  // }
  if (progress === 66.66){
    if (formData.Company_Position === '') {
      errors.Company_Position = 'Please enter a company Position'
    }
    if(formData.Company_Position !== "Home Owner" && formData.Company === '') {
        errors.Company = 'Please enter a company';
    }
    if(!formData.DiscountID){
      errors.DiscountID = 'Please enter discount rate'
    }
    return errors
  }
  if (progress === 99.99){
    if(!formData.Billing_Address){
      errors.Billing_Address = 'Please enter an address'
    }
    if(!formData.Billing_ZipCode){
      errors.Billing_ZipCode = 'Please enter a zip code'
    } 
    if(formData.Billing_ZipCode.length){
      if(formData.Billing_ZipCode !== '' && formData.Billing_ZipCode !== "undefined"){
        if(!regexNumber.test(formData.Billing_ZipCode)) {
          errors.Billing_ZipCode = 'Please enter a valid zip code'
        }
    }
  }
    if(!formData.Billing_City){
      errors.Billing_City = 'Please enter a city'
    }
    if(formData.Billing_City?.length){
      if(formData.Billing_City !== '' && formData.Billing_City != "undefined") {
        if(!regexNoNumber.test(formData.Billing_City)){
          errors.Billing_City = 'Please enter a valid city'
        }
    }
  }
    if(!formData.Billing_State) {
      errors.Billing_State = 'Please enter a state'
    }
    return errors
  }
  
  // if(!formData.Shipping_Address){
  //   errors.Shipping_Address = 'Please enter a shipping address'
  // } 
  //  return errors 
  
}

// VALIDACIONES PROJECT FORM 

export const validateCompletedInputsProject = (formData) =>{

  let errors = {}
  const regexNoNumber = /^[a-zA-Z\s!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]*$/;
  const regexNumberAndPlus = /^[\d+()\[\]-\s]*$/;
  const regexNumber = /^[0-9]+$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if(formData.Shipping_State !== ''){
    const string = formData.Shipping_State
    if(typeof string === 'string'){
      const match = USStates.find((item) => item.toLowerCase() === string.toLowerCase() || item.toLowerCase().includes(string.toLowerCase()));
      if(!match) {
        errors.Shipping_State = 'Please enter a valid state'
      }
    }
  }
  if(formData.Shipping_City !== ''){
    if(!regexNoNumber.test(formData.Shipping_City)){
      errors.Shipping_City = 'Please enter a valid City'
    }
  }
  if(formData.Shipping_ZipCode !== ''){
    if(!regexNumber.test(formData.Shipping_ZipCode)) {
      errors.Shipping_ZipCode = 'Please enter a valid zip code'
    }
  }
  return errors

}

export const validateEmptyInputsProjects = (formData) =>{
  let errors = {}
  const regexNumber = /^\d+[^-]*$/
  const regexOnlySting = /^[a-zA-Z\s]*$/

  if(!formData.Shipping_State) {
    errors.Shipping_State = 'Please enter a valid state'
  }else if(!USStates.includes(formData.Shipping_State)){
    errors.Shipping_State = 'Please enter a valid state'
  }
  if(!formData.ProjectName){
    errors.ProjectName = 'Please enter a projectName'
  }
  if(!formData.Shipping_City){
    errors.Shipping_City = 'Please enter a city'
  }
  if(formData.Shipping_City !== ''){
    if(!regexOnlySting.test(formData.Shipping_City)) {
      errors.Shipping_City = 'Please enter a valid city'
    }
  } 
  if(!formData.Shipping_Address){
    errors.Shipping_Address = 'Please enter a Shipping_Address'
  }
  if(!formData.Shipping_ZipCode){
    errors.Shipping_ZipCode = 'Please enter your zip code'
  } 
  if(formData.Shipping_ZipCode !== ''){
    if(!regexNumber.test(formData.Shipping_ZipCode)) {
      errors.Shipping_ZipCode = 'Please enter a valid zip code'
    }
  }

   return errors
}

export const validateEmptyInputsEditCustomer = (formData, progress) => {
  let errors = {}

  if(progress === 50){
    if(!formData.Contact_Name){
      errors.Contact_Name = 'Please enter customer name'
      }
    if(!formData.Phone){
      errors.Phone = 'Please enter phone number'
    }
    if(!formData.Email){
      errors.Email = 'Please enter email address'
    }
    if(!formData.Company){
      errors.Company = 'Please enter customer company name'
    }
    if(!formData.DiscountID){
      errors.DiscountID = 'Please enter discount rate'
    }
    if(!formData.Company_Position){
      errors.Company_Position = 'Please enter customer company position'
    }
    if(!formData.Address){
      errors.Address = 'Please enter an address'
    }
    if(!formData.ZipCode){
      errors.ZipCode = 'Please enter a zip code'
    } 
    if(!formData.City){
      errors.City = 'Please enter a city'
    }
    if(!formData.State) {
      errors.State = 'Please enter a state'
    }
    return errors  
  }
  if (progress === 100){
    if(!formData.Billing_Address){
      errors.Billing_Address = 'Please enter an address'
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
}

export const validateCompletedInputsEditCustomer = (formData) =>{
  let errors = {}
  const regexNoNumber = /^[a-zA-Z\s!"#$%&'()*+,./:;<=>?@\[\\\]^_`{|}~]*$/;
  const regexNumberAndPlus = /^[\d+()\[\]-\s]*$/;
  const regexNumber = /^[0-9]+$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const regexOnlySting = /^[a-zA-Z\s]*$/
  const regexNoCaracters = /^[a-zA-Z\s]+$/

  if(formData.Company_Position !== "Home Owner" && formData.Company === '') {
    errors.Company = 'Please enter a company';
  }

  if(formData.Contact_Name === '') errors.Contact_Name = 'Please enter a name'
  if(formData.Contact_Name !== ''){
    if(!regexNoNumber.test(formData.Contact_Name)) {
      errors.Contact_Name = 'Please enter a valid name'
    } 
  }

  if (formData.Email === '') errors.Email = 'Please enter a email'
  if(formData.Email !== ''){
    if(!regexEmail.test(formData.Email)){
      errors.Email = 'Please enter a valid email'
    }
  }
  if(formData.Company_Position !== ''){
    if(!regexOnlySting.test(formData.Company_Position)){
      errors.Company_Position = 'Please enter a valid Company position'
    }
  }
  if(formData.Company_Position === ''){
      errors.Company_Position = 'Please enter a company position'
  }

  if(formData.DiscountRate !== 0 || formData.DiscountRate !== 5 || formData.DiscountRate !== 10 || formData.DiscountRate !== 15) {
    const allowedValues = ["0", "5", "10", "15"];
    if(!allowedValues.includes(formData.DiscountRate)){
      errors.DiscountRate = 'Valid discounts: 0, 5, 10, 15'
    }
  }
  if(formData.Address !== ''){
    if(!regexNoCaracters.test(formData.Address)) {
      errors.Address = 'Please enter a valid address'
    }
  }
  if(formData.ZipCode !== ''){
    if(!regexNumber.test(formData.ZipCode)) {
      errors.ZipCode = 'Please enter a valid zip code'
    }
  }
  if(formData.City !== '') {
    if(!regexNoNumber.test(formData.City)){
      errors.City = 'Please enter a valid City'
    }
  }
  if(formData.State !== '') {
    if(!USStates.includes(formData.State)) {
      errors.State = 'Please enter a valid state'
    }
  }
  if (formData.Billing_ZipCode === '') errors.Billing_ZipCode = 'Please enter a zip code'
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
  if (formData.Billing_Address === '') errors.Billing_Address = 'Please enter a address'
  if(formData.Billing_Address !== ''){
    if(!regexNoCaracters.test(formData.Billing_Address)) {
      errors.Billing_Address = 'Please enter a valid address'
    }
  }
  if (formData.Billing_State === '') errors.Billing_State = 'Please enter a state'
  if(formData.Billing_State !== ''){
    if(!USStates.includes(formData.Billing_State)) {
      errors.Billing_State = 'Please enter a valid state'
    }
  }
  if (formData.Billing_City === '') errors.Billing_City = 'Please enter a city'
  if(formData.Billing_City !== '') {
    if(!regexNoNumber.test(formData.Billing_City)){
      errors.Billing_City = 'Please enter a valid city'
    }
  }

  return errors
}

export const validateEmptyFactory = (formData, progress) => {
  let errors = {}

  if(progress === 25){
    if(!formData.Factory_Name){
      errors.Factory_Name = 'Please enter factory name'
      }
    if(!formData.Phone){
      errors.Phone = 'Please enter phone number'
    }
    if(!formData.Email){
      errors.Email = 'Please enter email address'
    }
    if(!formData.International_Flag){
      errors.International_Flag = 'Please enter Y (yes) or N (no) for international factory'
    }
    return errors  
  }
}
export const validateCompletedInputsFactory = (formData) =>{
  let errors = {}
  const regexNoNumber = /^[a-zA-Z\s!"#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]*$/;
  const regexNumberAndPlus = /^[\d+()\[\]-\s]*$/;
  const regexNumber = /^[0-9]+$/;
  const regexYN = /^[YN]$/;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  

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
  if(formData.International_Flag !== ''){
    if(!regexYN.test(formData.International_Flag)){
      errors.International_Flag = 'Please enter Y (yes) or N (no) for international factory'
    }
  }

  return errors
}

export function validateProject(tracking) {

  let errors = {}
  const regexNumber = /^\d+$/
  if (tracking !== '') {
    if (!regexNumber.test(tracking)) {
      errors.trackingNumber = 'Please insert a valid Tracking number'
    }
  if(tracking == '') errors.trackingNumber = 'Please insert a Tracking number'}

  return errors
}

export function validateInputTracking(formData) {
  let errors = {}
  // const regexNumber = /^\d+$/
  // if (formData.variables.trackingNumber !== '') {
  //   if (!regexNumber.test(formData.variables.trackingNumber)) {
  //     errors.trackingNumber = 'Only numbers allowed'
  //   }
  // }
  if (formData.variables.estDelivDate === '') {
    errors.estDelivDate = 'Please insert a date'
  }
  return errors
}

export const validateEmptyInputsCreateSample = (formData) => {
  let errors = validateCompletedInputs(formData)
  
  if(!formData.Contact_Name){
    errors.Contact_Name = 'Please enter customer name'
    }
  if(!formData.Phone){
    errors.Phone = 'Please enter phone number'
  }
  if(!formData.Email){
    errors.Email = 'Please enter email address'
  }
  if(formData.Seller == '' || formData.Seller == null){
    errors.Seller = 'Please enter a seller'
  }

return errors
}
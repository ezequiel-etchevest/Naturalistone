const maxChars = 21.8;
const charWidth = 10;

export const getXForExtPrice = (extPrice) => {

    const length = extPrice.toString().length;
    
    if(length === 1) return 558;
    if(length === 2) return 553;
    if(length === 3) return 561;
    if(length === 4) return 549;
    if(length === 5) return 543;
    if(length === 6) return 539;
    if(length === 7) return 536;
    if(length === 8) return 531.2;
    if(length === 9) return 526;
    if(length > 9) return 504;
  }
export const getXForExtTotal = (extPrice) => {

    const length = extPrice.toString().length;
    
    if(length === 1) return 558;
    if(length === 2) return 553;
    if(length === 3) return 561;
    if(length === 4) return 551;
    if(length === 5) return 543;
    if(length === 6) return 540;
    if(length === 7) return 532;
    if(length === 8) return 524;
    if(length === 9) return 516;
    if(length > 9) return 504;
  }

export  const getXForPrice = (price) => {

    const length = price.toString().length;

    if(length === 1) return 490;
    if(length === 2) return 485;
    if(length === 3) return 480;
    if(length === 4) return 475;
    if(length > 4) return 470;

    return 475; // valor por defecto
  }

export  const getXForID = (price) => {

    const length = price.toString().length;

    if(length === 3) return 140;
    if(length === 4) return 136;
    if(length > 4) return 132;
  }

export const getXForQuantity = (quantity) => {

    const length = quantity.toString().length;

    if(length === 1) return 51;
    if(length === 2) return 49;
    if(length === 3) return 47;
    if(length === 4) return 45;
    if(length > 4) return 43;

    return 43; // valor por defecto
  }

export const getXForUM = (um) => {
    if(um === "Tile" || um === "Sqft") return 77;
    else return 76;
  }

export  const getX = (text) => {

    const textWidth = text.length * charWidth;
    
    // Alinear a la izquierda dentro del espacio
    const x = (maxChars * charWidth - textWidth);

    return x; 
  }
export  const getXPO = (text) => {

    const textWidth = text.length * charWidth;
    
    // Alinear a la izquierda dentro del espacio
    const xpo = (maxChars * charWidth - textWidth);

    return xpo + 35; 
  }
export  const getXPaymentTerms = (text) => {
    const initialCoord = 466
    const textWidth = text.length * charWidth;
    
    // Alinear a la izquierda dentro del espacio
    const xpo = (maxChars * charWidth - textWidth);

    return  initialCoord + xpo; 
  }
export  const getFontSize = (text) => {
    const textLength = text.length ;
    
    // Alinear a la izquierda dentro del espacio
    const size = textLength > 15 ? 8 : 10;

    return  size; 
  }

export const parseThickness = (thickness) => {

    // Caso 1 - 3/8
    if(thickness.includes('/')) {
      const [num1, num2] = thickness.split('/');
      return `${num1}/${num2}"`;
    }
  
    // Caso 2 - 1 1/4
    if(thickness.includes(' ')) {
      const [num1, num2] = thickness.split(' ');
      const [num3, num4] = num2.split('/');
      return `${num1} ${num3}/${num4}"`; 
    }
  
    // Caso 3 - Entero
    if(Number.isInteger(Number(thickness))) {
      return `${thickness}"`;
    }
  
    // Caso 4 - 6Mm
    if(thickness.includes('Mm')) {
      return thickness;
    }
  
  }

 export const parsedNumbers = (number) => {
    const formattedPrice = (number).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const parsedNumber = formattedPrice.includes('.')
    ? formattedPrice   : `${formattedPrice}.00`;
    return parsedNumber
  }
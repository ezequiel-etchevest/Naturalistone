const maxChars = 21.8;
const charWidth = 10;

export const getXForExtPrice = (extPrice) => {

    const length = extPrice.toString().length;
    if(length === 1) return 556;
    if(length === 2) return 552;
    if(length === 3) return 548;
    if(length === 4) return 544;
    if(length === 5) return 540;
    if(length === 6) return 534.5;
    if(length === 7) return 532;
    if(length === 8) return 528;
    if(length === 9) return 524;
    if(length > 9) return 520;
  
  }

export const getXForExtSubtotal= (subtotal) => {
  const length = subtotal.toString().length;

  if(length === 1) return 552;
  if(length === 2) return 548;
  if(length === 3) return 542;
  if(length === 4) return 538;
  if(length === 5) return 534;
  if(length === 6) return 530;
  if(length === 7) return 526;
  if(length === 8) return 522;
  if(length === 9) return 516;
  if(length === 10) return 510;
  if(length > 10) return 504;
}  

export const getXForExtTotal = (extPrice) => {

    const length = (extPrice).toString().length;
    if(length === 1) return 568;
    if(length === 2) return 560;
    if(length === 3) return 552;
    if(length === 4) return 544;
    if(length === 5) return 536;
    if(length === 6) return 528;
    if(length === 7) return 520;
    if(length === 8) return 512;
    if(length === 9) return 506;
    if(length === 10) return 500;
    if(length > 10) return 494;
  }

export  const getXForPrice = (price) => {

    const length = price.toString().length;
    if(length === 1) return 494;
    if(length === 2) return 489;
    if(length === 3) return 485
    if(length === 4) return 481;
    if(length === 5) return 477;
    if(length === 6) return 472;
    if(length === 7) return 469;
    if(length === 8) return 465;
    if(length === 9) return 461;
    if(length > 9) return 457;
  }

export  const getXForID = (price) => {

    const length = price.toString().length;

    if(length === 3) return 140;
    if(length === 4) return 136;
    if(length > 4) return 128;
  }

export const getXForQuantity = (quantity) => {

    const length = (quantity).toString().length;
    if(length === 1) return 51;
    if(length === 2) return 49;
    if(length === 3) return 47;
    if(length === 4) return 42;
    if(length === 5) return 38;
    if(length > 5) return 37;

  }

export const getXForUM = (um) => {

    if(um === "Tile" || um === "Sqft" || um === 'Mosaic') return 80;
    else return 76;
  }

export const getXRef = (text) => {
  const start = 40;
  const finish = 126; 

  if (text.length > 18) text = text.substring(0, 18 - 3) + '...';
  const textWidth = text.length * 4.34;

  // Calcular la posición para que el texto esté centrado
  const x = start + ((finish - start) - textWidth) / 2;
  return x; 
}
export  const getX = (text) => {

    const textWidth = text.length * charWidth;
    
    // Alinear a la izquierda dentro del espacio
    const x = (maxChars * charWidth - textWidth);

    return x; 
  }
export  const getXPO = (text) => {
  const start = 132;
  const finish = 222; 
  
  if (text.length > 18) text = text.substring(0, 18 - 3) + '...';
  const textWidth = text.length * 4.34;

  // Calcular la posición para que el texto esté centrado
  const x = start + ((finish - start) - textWidth) / 2;
  return x; 
  }
export  const getXPaymentTerms = (text) => {
  const start = 502;
  const finish = 570; 
  if(text.length === 13) {
    const x = 502;
    return x
  }

  if (text.length > 13) text = text.substring(0, 13 - 3) + '...';
  const textWidth = text.length * 4.34;
  // Calcular la posición para que el texto esté centrado
  const x = start + ((finish - start) - textWidth) / 2;

  return x; 
  }
export  const getFontSize = (text) => {
    const textLength = text.length ;
    
    // Alinear a la izquierda dentro del espacio
    const size = textLength > 15 ? 8 : 10;

    return  size; 
  }

  export const parseThickness = (thickness) => {
    function formatThickness(thickness, term) {
      const parts = thickness.split(term);
      const previousTerm = parts[0].trim();
      const numberBeforeTerm = parseFloat(previousTerm);
      return isNaN(numberBeforeTerm) ? previousTerm : numberBeforeTerm;
    }
  
  
    // Caso 1 - 3/8
    if (thickness.includes('/')) {
      const [num1, num2] = thickness.split('/');
      return `${num1}/${num2}"`;
    }
  
    // Caso 2 - 1 1/4
    if (thickness.includes(' ')) {
      const [num1, num2] = thickness.split(' ');
      const [num3, num4] = num2.split('/');
      return `${num1} ${num3}/${num4}"`;
    }
  
    // Caso 3 - Entero
    if (Number.isInteger(Number(thickness))) {
      return `${thickness}"`;
    }
  
    // Caso 4 - 6Mm
    const terms = ['Mm', 'mm', 'mM', 'MM'];
    for (const term of terms) {
      if (thickness.toLowerCase().includes(term.toLowerCase())) {
        return formatThickness(thickness, term);
      }
    }
  
    return `${thickness}Mm`;
  };

  export const formatedPcs = (type, quantity, size) => {
    let total
    if(type === 'Tile'){
    const num1 = Number(size.split('x')[0])
    const num2 = Number(size.split('x')[1])
    const numb = num1 * num2;
    total = Number(quantity) / numb;
    return `(Pcs: ${total.toFixed(2)})`
    }  
    return ""
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

  export const formatTextForPdf = (text, maxLength) => {
    const words = text.split(' ');
    let currentLine = words[0];
    const lines = [];
  
    for (let i = 1; i < words.length; i++) {
      const word = words[i];
  
      if (currentLine.length + word.length + 1 <= maxLength) {
        currentLine += ` ${word}`;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
  
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
  
    return lines.join('\n');
  }
  

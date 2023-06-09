const date = new Date().toLocaleDateString();
const day = `${date.split('/')[0]}`;
const month = `${(date.split('/')[1])}`;
const day0 = day.length === 1 ? `0${day}` : day
const month0 = month.length === 1 ? `0${month}` : month
const year = `${date.split('/')[2]}`;


module.exports = {
    day0,
    month0,
    year
  };
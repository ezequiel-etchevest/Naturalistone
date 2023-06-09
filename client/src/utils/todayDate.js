const date = new Date().toLocaleDateString();
const day = `${date.split('/')[0]}`;
const month = `${(date.split('/')[1])}`;
export const day0 = day.length === 1 ? `0${day}` : day
export const month0 = month.length === 1 ? `0${month}` : month
export const year = `${date.split('/')[2]}`;

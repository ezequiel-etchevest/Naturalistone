function uniqueYears(data) {

const years = [];

for (const row of data) {
  const year = row.dates.getFullYear();

  if (!years.includes(year)) {
    years.push(year);
  }
}

return years

}

module.exports = uniqueYears
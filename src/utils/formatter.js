const NUMBER_REG = /(\d)(?=(\d{3})+(?!\d))/g;
const DELIMITER = ',';

function formatNumber(num, delimiter = DELIMITER) {
  const str = String(num);

  return str.replace(NUMBER_REG, `$1${delimiter}`);
}

module.exports = formatNumber;

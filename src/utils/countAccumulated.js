const groupBy = require('./groupBy');

function countAccumalated(data) {
  const groupedData = groupBy(data, 'publishedAt');

  const dataArr = Object.values(groupedData);
  const result = [];
  let total = 0;

  for (let i = 0; i < dataArr.length; i++) {
    total = total + dataArr[i].length;
    result.push({
      publishedAt: Object.keys(groupedData)[i],
      total,
      lastTime: i === 0 ? 0 : total - dataArr[i].length,
    });
  }

  return result;
}

module.exports = countAccumalated;

function groupBy(data, key) {
  const result = {};
  data.forEach((d) => {
    if (result[d[key]]) {
      result[d[key]].push(d);
    } else {
      result[d[key]] = [d];
    }
  });

  return result;
}

module.exports = groupBy;

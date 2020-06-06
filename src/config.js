const createDetail = (t) => {
  return {
    age: {
      name: t('infectionDetail.age'),
      type: 'text',
      sortable: true,
      comparator: (a, b) => {
        const [ageA] = a.match(/(\d+)/);
        const [ageB] = b.match(/(\d+)/);

        return +ageB - +ageA;
      },
    },
    publishedAt: {
      name: t('infectionDetail.publishedAt'),
      type: 'text',
      sortable: true,
      comparator: (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    },
    gender: {
      name: t('infectionDetail.gender'),
      type: 'text',
      formatter: (d) => d[0],
    },
    hasDischarged: {
      name: t('infectionDetail.discharged'),
      sortable: true,
      comparator: (a, b) => (b === '1' ? 1 : -1),
      formatter: (text) =>
        text === '1'
          ? // TODO: extract
            `O`
          : '',
      type: 'text',
    },
    liveAt: {
      name: t('infectionDetail.area'),
      type: 'text',
    },
  };
};

module.exports = { createDetail };

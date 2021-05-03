import sampleVisorsUptimeData from '../sample-visors-uptime-data';

const getVisorsList = async (useFakeData: boolean = false) => {
  if (useFakeData) {
    return new Promise((res, rej) => {
      res(sampleVisorsUptimeData);
    });
  }
  const visorsList = await fetch('http://localhost:8080/visors', {
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
  return visorsList;
};

export { getVisorsList };

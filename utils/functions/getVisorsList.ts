import sampleMyVisorsData from '../sample-my-visors-data';
import sampleVisorsUptimeData from '../sample-visors-uptime-data';

const getVisorsList = async (useFakeData = false): Promise<any> => {
  if (useFakeData) {
    return new Promise((res) => {
      res(sampleVisorsUptimeData);
    });
  }
  const visorsList = await fetch('http://localhost:8080/visors', {
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
  return visorsList;
};

const getMyVisorsList = async (useFakeData = false): Promise<any> => {
  if (useFakeData) {
    return new Promise((res) => {
      res(sampleMyVisorsData);
    });
  }
  return new Promise((res) => {
    res(sampleMyVisorsData);
  });
  // const visorsList = await fetch('http://localhost:8080/visors', {
  //   headers: { 'Content-Type': 'application/json' },
  // }).then((res) => res.json());
  // return visorsList;
};

export { getVisorsList, getMyVisorsList };

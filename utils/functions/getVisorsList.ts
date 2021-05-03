const getVisorsList = async () => {
  const visorsList = await fetch('http://localhost:8080/visors', {
    headers: { 'Content-Type': 'application/json' },
  }).then((res) => res.json());
  return visorsList;
};

export { getVisorsList };

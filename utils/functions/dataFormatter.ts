const formatSecsToDays = (seconds: number, suffix: string = 'd') => {
  const days = seconds / 86400;
  const formattedDays = days.toFixed(2) + suffix;
  return formattedDays;
};

const formatPercentage = (percentage: number, suffix: string = '%') => {
  const formattedPercentage = percentage.toFixed(2) + suffix;
  return formattedPercentage;
};

export { formatSecsToDays, formatPercentage };

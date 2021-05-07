const formatSecsToDays = (seconds: number, suffix = 'd'): string => {
  const days = seconds / 86400
  const formattedDays = days.toFixed(2) + suffix
  return formattedDays
}

const formatPercentage = (percentage: number, suffix = '%'): string => {
  const formattedPercentage = percentage.toFixed(2) + suffix
  return formattedPercentage
}

const getHealthPercentage = (
  uptimeSeconds: number,
  totalSeconds: number,
  suffix = '%'
): string => {
  const health = (100 * uptimeSeconds) / totalSeconds
  const formattedHealth = health.toFixed(0) + suffix
  return formattedHealth
}

export { formatSecsToDays, formatPercentage, getHealthPercentage }

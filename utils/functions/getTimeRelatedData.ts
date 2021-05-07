const getSecsElapsedThisMonth = (): number => {
  const now = new Date()
  const dayOne = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)
  const distance = now.getTime() - dayOne.getTime()
  const totalSeconds = Math.floor(distance / 1000)
  return totalSeconds
}

export { getSecsElapsedThisMonth }

import { MyVisor, MyVisorUptime, VisorUptime } from '../../interfaces'

const getMyVisorsUptimes = (myVisors, visors): MyVisorUptime[] => {
  const visorKeysToMatch = myVisors.map((myVisor: MyVisor) => myVisor.visorKey)
  const matchingVisors = visors.filter((visor: VisorUptime) =>
    visorKeysToMatch.includes(visor.visorKey)
  )
  const myVisorsUptimesWithLabels = matchingVisors.map((visor: VisorUptime) => {
    const myVisorToUpdate = myVisors.find(
      (myVisor: MyVisor) => myVisor.visorKey === visor.visorKey
    )
    return myVisorToUpdate && { ...visor, label: myVisorToUpdate.label }
  })
  const sortedVisors = myVisorsUptimesWithLabels.sort(
    (a: MyVisorUptime, b: MyVisorUptime) =>
      a.label.localeCompare(b.label, 'en', { numeric: true })
  )
  return sortedVisors
}

export { getMyVisorsUptimes }

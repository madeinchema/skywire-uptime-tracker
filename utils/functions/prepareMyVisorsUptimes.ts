import { MyVisor, MyVisorUptime, VisorUptime } from '../../interfaces'

const getMyVisorsUptimes = (
  myVisors: MyVisor[],
  visors: VisorUptime[]
): MyVisorUptime[] => {
  const matchingVisors = visors.filter((visor: VisorUptime) => {
    const matchingVisor = myVisors.find(
      myVisor => myVisor.visorKey === visor.visorKey
    )
    if (!matchingVisor?.visorKey) {
      return false
    }
    return { ...visor, label: matchingVisor.label }
  }) as MyVisorUptime[]

  const sortedVisors = matchingVisors.sort(
    (a: MyVisorUptime, b: MyVisorUptime) =>
      a.label.localeCompare(b.label, 'en', { numeric: true })
  )
  return sortedVisors
}

export { getMyVisorsUptimes }

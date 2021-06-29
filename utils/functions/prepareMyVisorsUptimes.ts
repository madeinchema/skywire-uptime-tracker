import { MyVisor, MyVisorUptime, VisorUptime } from '../../interfaces'

const getMyVisorsUptimes = async (
  myVisors: MyVisor[],
  visors: VisorUptime[]
): Promise<MyVisorUptime[]> => {
  return new Promise(res => {
    const myVisorUptimes: MyVisorUptime[] = myVisors.map(myVisor => {
      const matchingVisor = visors.find(
        visor => visor.visorKey === myVisor.visorKey
      )
      if (!matchingVisor) throw new Error('Could not find matching visor.')
      return (
        matchingVisor && {
          ...matchingVisor,
          label: myVisor.label,
        }
      )
    })

    const sortedVisors = myVisorUptimes.sort(
      (a: MyVisorUptime, b: MyVisorUptime) =>
        a.label.localeCompare(b.label, 'en', { numeric: true })
    )
    res(sortedVisors)
  })
}
export { getMyVisorsUptimes }

import { MyVisor, VisorKey, VisorUptime } from '../../interfaces'

const findVisorByKey = (
  visorsToCheck: VisorUptime[] | MyVisor[],
  visorKey: VisorKey
): undefined | VisorUptime | MyVisor => {
  const visorDataFound = (visorsToCheck as Array<VisorUptime | MyVisor>).find(
    (visor: VisorUptime | MyVisor) => visor.visorKey === visorKey
  )
  return visorDataFound
}

export { findVisorByKey }

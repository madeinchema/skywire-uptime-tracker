import { MyVisor, VisorKey, VisorUptime } from '../../interfaces'

const getVisorUptimeByKey = (
  visorsToCheck: VisorUptime[],
  visorKey: VisorKey
): undefined | VisorUptime => {
  const visorDataFound = (visorsToCheck as Array<VisorUptime>).find(
    (visor: VisorUptime) => visor.visorKey === visorKey
  )
  return visorDataFound
}

const checkCanFindVisorByKey = (
  visorsToCheck: VisorUptime[] | MyVisor[],
  visorKey: VisorKey
): boolean => {
  const visorDataFound = (visorsToCheck as Array<VisorUptime | MyVisor>).some(
    (visor: VisorUptime | MyVisor) => visor.visorKey === visorKey
  )
  return visorDataFound
}

export { getVisorUptimeByKey, checkCanFindVisorByKey }

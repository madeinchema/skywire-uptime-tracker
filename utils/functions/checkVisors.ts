import { VisorKey, VisorUptime } from '../../interfaces'

const findVisorByKey = (
  visorsToCheck: VisorUptime[],
  visorKey: VisorKey
): Promise<boolean | VisorUptime> => {
  return new Promise(resolve => {
    const visorDataFound = visorsToCheck.find(
      (visor: VisorUptime) => visor.visorKey === visorKey
    )
    if (!visorDataFound) return resolve(false)
    return resolve(visorDataFound)
  })
}

export { findVisorByKey }

import config from '../../config'
import { VisorKey, VisorUptime } from '../../interfaces'
import sampleVisorsUptimeData from '../sample-visors-uptime-data'

type VisorUptimeDataFromAPI = (Omit<VisorUptime, 'visorKey'> & {
  key: VisorKey
})[]

function formatVisorUptimeDataFromApi(
  data: VisorUptimeDataFromAPI
): VisorUptime[] {
  const formattedData: VisorUptime[] = data.map(item => {
    const { key, ...restItem } = item
    const formattedItem = {
      ...restItem,
      visorKey: item.key,
    }
    return formattedItem
  })
  return formattedData
}

const getVisorsList = async (): Promise<VisorUptime[]> => {
  if (config.FAKE_DATA) {
    return new Promise(res => {
      const formattedData = formatVisorUptimeDataFromApi(sampleVisorsUptimeData)
      res(formattedData)
    })
  }
  const visorsList = await fetch(`http://${config.API_URL}/visors`, {
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .then(data => formatVisorUptimeDataFromApi(data))
  return visorsList
}

export { getVisorsList }

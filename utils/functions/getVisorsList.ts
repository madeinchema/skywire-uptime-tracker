import { MyVisor, VisorUptime } from '../../interfaces'
import sampleMyVisorsData from '../sample-my-visors-data'
import sampleVisorsUptimeData from '../sample-visors-uptime-data'

type UseFakeData = 'USE_FAKE_DATA'

const getVisorsList = async (
  useFakeData?: UseFakeData
): Promise<VisorUptime[]> => {
  if (useFakeData === 'USE_FAKE_DATA') {
    return new Promise(res => {
      res(sampleVisorsUptimeData)
    })
  }
  const visorsList = await fetch('http://localhost:8080/visors', {
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json())
  return visorsList
}

const getMyVisorsList = async (
  useFakeData: UseFakeData
): Promise<MyVisor[]> => {
  if (useFakeData === 'USE_FAKE_DATA') {
    return new Promise(res => {
      res(sampleMyVisorsData)
    })
  }
  return new Promise(res => {
    res(sampleMyVisorsData)
  })
}

export { getVisorsList, getMyVisorsList }

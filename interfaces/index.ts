import { UseToastOptions } from '@chakra-ui/toast'

export type VisorKey = string
export type VisorLabel = string

export type MyVisor = {
  visorKey: VisorKey
  label: VisorLabel
}

export type VisorUptime = {
  visorKey: VisorKey
  uptime: number
  downtime: number
  percentage: number
  online: boolean
}

export type MyVisorUptime = MyVisor & VisorUptime

export type Toast = UseToastOptions & {
  shown: boolean
}

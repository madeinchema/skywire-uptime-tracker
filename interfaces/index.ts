export type VisorKey = string;
export type VisorLabel = string;

export type MyVisor = {
  key: VisorKey;
  label: VisorLabel;
};

export type VisorUptime = {
  key: VisorKey;
  uptime: number;
  downtime: number;
  percentage: number;
  online: boolean;
};

export type MyVisorUptime = MyVisor & VisorUptime;

export type TicketType = 'outpatient-odd' | 'outpatient-even' | 'emergency' | 'inpatient';

export interface TicketDisplay {
  id: TicketType;
  title: string;
  currentNumber: number;
  baseNumber: number;
  intervalMs: number;
  increment: number;
  visible: boolean;
}

export interface DisplaySettings {
  showOutpatientOdd: boolean;
  showOutpatientEven: boolean;
  showEmergency: boolean;
  showInpatient: boolean;
}

export interface MedicineRequest {
  actionType?: string;
  code?: string;
  name?: string;
  requestedQuantity?: string;
  requestingUnit?: string;
  state?: string;
  temp_GUID?: string;
  [key: string]: any;
}

export interface SignalRMessage {
  Method?: string;
  Result?: string;
  Data?: MedicineRequest[];
  [key: string]: any;
}

export interface Config {
  domain: string;
  homepage: string;
}

export interface ServerSettingItem {
  name: string;
  [key: string]: any;
}

export interface LoginSession {
  GUID: string;
  ID: string;
  Name: string;
  Employer: string;
  loginTime: string;
  verifyTime: string;
  serverName: string;
  serverType: string;
  state: string;
  note: string;
  Permissions: any[];
}

export interface UserInfo {
  name: string;
  id: string;
  role?: string;
  guid?: string;
  employer?: string;
  loginTime?: string;
  serverName?: string;
  [key: string]: any;
}

import { loadConfig } from '../utils/config';
import { MedicineRequest, ServerSettingItem } from '../types';

interface RequestAddPayload {
  Data: Array<{
    actionType?: string;
    code?: string;
    name?: string;
    requestedQuantity?: string;
    requestingUnit?: string;
    issuingUnit?: string;
    requestingPerson: string;
    requestingPersonID: string;
    state: string;
    temp_GUID?: string;
  }>;
}

interface ApiResponse {
  Code: number;
  Message?: string;
  [key: string]: any;
}

export const addMedicineRequest = async (
  requests: MedicineRequest[],
  requestingPerson: string,
  requestingPersonID: string,
  issuingUnit: string
): Promise<ApiResponse> => {
  const config = await loadConfig();
  const url = `${config.domain}/api/materialRequisition/add`;

  const payload: RequestAddPayload = {
    Data: requests.map(request => ({
      actionType: request.actionType,
      code: request.code,
      name: request.name,
      requestedQuantity: request.requestedQuantity,
      requestingUnit: request.requestingUnit,
      issuingUnit: issuingUnit,
      requestingPerson,
      requestingPersonID,
      state: '等待過帳',
      temp_GUID: request.temp_GUID,
    })),
  };

  console.log('[addMedicineRequest] URL:', url);
  console.log('[addMedicineRequest] Payload:', payload);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('[addMedicineRequest] Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    console.log('[addMedicineRequest] Response data:', result);
    return result;
  } catch (error) {
    console.error('[addMedicineRequest] Error:', error);
    throw error;
  }
};

export const sendMessage = async (responseData: ApiResponse): Promise<void> => {
  const config = await loadConfig();
  const url = `${config.domain}/api/Message`;

  console.log('[sendMessage] URL:', url);
  console.log('[sendMessage] Payload:', responseData);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(responseData),
    });

    console.log('[sendMessage] Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('[sendMessage] Message sent successfully');
  } catch (error) {
    console.error('[sendMessage] Error:', error);
    throw error;
  }
};

export const getServerSettingByType = async (type: '調劑台' | '藥庫'): Promise<ServerSettingItem[]> => {
  const config = await loadConfig();
  const url = `${config.domain}/api/ServerSetting/get_name`;

  const payload = {};

  console.log('[getServerSettingByType] URL:', url);
  console.log('[getServerSettingByType] Payload:', payload);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    console.log('[getServerSettingByType] Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('[getServerSettingByType] Response data:', result);

    return result.Data || [];
  } catch (error) {
    console.error('[getServerSettingByType] Error:', error);
    throw error;
  }
};

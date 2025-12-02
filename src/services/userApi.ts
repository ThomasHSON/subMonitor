import { loadConfig } from '../utils/config';
import { LoginSession, UserInfo } from '../types';

export const getLoginSessions = async (currentStationName: string): Promise<UserInfo[]> => {
  try {
    const config = await loadConfig();
    const url = `${config.domain}/api/session/get_login_session`;

    console.log('[getLoginSessions] URL:', url);
    console.log('[getLoginSessions] Current Station:', currentStationName);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({}),
    });

    console.log('[getLoginSessions] Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('[getLoginSessions] Response data:', result);

    if (result.Code === 200 && result.Data && Array.isArray(result.Data)) {
      const filteredSessions = result.Data.filter(
        (session: LoginSession) =>
          session.serverName === currentStationName &&
          session.state === 'login'
      );

      console.log('[getLoginSessions] Filtered sessions (station + login state):', filteredSessions);

      return filteredSessions.map((session: LoginSession) => ({
        name: session.Name,
        id: session.ID,
        guid: session.GUID,
        role: session.Employer,
        employer: session.Employer,
        loginTime: session.loginTime,
        serverName: session.serverName,
      }));
    }

    return [];
  } catch (error) {
    console.error('[getLoginSessions] Error:', error);
    throw error;
  }
};

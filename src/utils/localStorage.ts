import { DisplaySettings } from '../types';

const SETTINGS_KEY = 'pharmacy-display-settings';
const STATION_NAME_KEY = 'stationName';

export const defaultSettings: DisplaySettings = {
  showOutpatientOdd: true,
  showOutpatientEven: true,
  showEmergency: true,
  showInpatient: true,
};

export const loadSettings = (): DisplaySettings => {
  try {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      return { ...defaultSettings, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  return defaultSettings;
};

export const saveSettings = (settings: DisplaySettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
};

export const loadStationName = (): string | null => {
  try {
    return localStorage.getItem(STATION_NAME_KEY);
  } catch (error) {
    console.error('Failed to load station name:', error);
    return null;
  }
};

export const saveStationName = (stationName: string): void => {
  try {
    localStorage.setItem(STATION_NAME_KEY, stationName);
  } catch (error) {
    console.error('Failed to save station name:', error);
  }
};

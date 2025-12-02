import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServerSettingItem } from '../types';
import { getServerSettingByType } from '../services/medicineApi';
import { loadStationName, saveStationName } from '../utils/localStorage';

interface ServerSettingsContextType {
  stations: ServerSettingItem[];
  pharmacies: ServerSettingItem[];
  currentStationName: string;
  setCurrentStationName: (name: string) => void;
  isLoading: boolean;
}

const ServerSettingsContext = createContext<ServerSettingsContextType | undefined>(undefined);

interface ServerSettingsProviderProps {
  children: ReactNode;
}

export function ServerSettingsProvider({ children }: ServerSettingsProviderProps) {
  const [stations, setStations] = useState<ServerSettingItem[]>([]);
  const [pharmacies, setPharmacies] = useState<ServerSettingItem[]>([]);
  const [currentStationName, setCurrentStationNameState] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServerSettings = async () => {
      try {
        console.log('[ServerSettings] Fetching server settings...');

        const [stationsData, pharmaciesData] = await Promise.all([
          getServerSettingByType('調劑台'),
          getServerSettingByType('藥庫'),
        ]);

        console.log('[ServerSettings] Stations:', stationsData);
        console.log('[ServerSettings] Pharmacies:', pharmaciesData);

        setStations(stationsData);
        setPharmacies(pharmaciesData);

        const savedStationName = loadStationName();
        console.log('[ServerSettings] Saved station name:', savedStationName);

        if (savedStationName && stationsData.some(s => s.name === savedStationName)) {
          setCurrentStationNameState(savedStationName);
        } else if (stationsData.length > 0) {
          const defaultStation = stationsData[0].name;
          console.log('[ServerSettings] Using default station:', defaultStation);
          setCurrentStationNameState(defaultStation);
          saveStationName(defaultStation);
        }
      } catch (error) {
        console.error('[ServerSettings] Failed to fetch server settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServerSettings();
  }, []);

  const setCurrentStationName = (name: string) => {
    console.log('[ServerSettings] Changing station to:', name);
    setCurrentStationNameState(name);
    saveStationName(name);
  };

  const contextValue: ServerSettingsContextType = {
    stations,
    pharmacies,
    currentStationName,
    setCurrentStationName,
    isLoading,
  };

  return (
    <ServerSettingsContext.Provider value={contextValue}>
      {children}
    </ServerSettingsContext.Provider>
  );
}

export function useServerSettings() {
  const context = useContext(ServerSettingsContext);
  if (!context) {
    throw new Error('useServerSettings must be used within ServerSettingsProvider');
  }
  return context;
}

import { Config } from '../types';

let cachedConfig: Config | null = null;

export const loadConfig = async (): Promise<Config> => {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const response = await fetch('/config.txt');
    const config = await response.json();
    cachedConfig = config;
    return config;
  } catch (error) {
    console.error('Failed to load config:', error);
    return {
      domain: '',
      homepage: '',
    };
  }
};

import { createContext, useContext, useRef, useEffect, ReactNode } from 'react';
import * as signalR from '@microsoft/signalr';
import { SignalRMessage, MedicineRequest } from '../types';
import { loadConfig } from '../utils/config';

interface SignalRContextType {
  sendMessage: (message: string) => Promise<void>;
  medicineRequests: MedicineRequest[];
}

const SignalRContext = createContext<SignalRContextType | null>(null);

export const medicineRequestsStore: MedicineRequest[] = [];

export const removeMedicineRequests = (indices: number[]): void => {
  indices.sort((a, b) => b - a);
  indices.forEach(index => {
    if (index >= 0 && index < medicineRequestsStore.length) {
      medicineRequestsStore.splice(index, 1);
    }
  });
  window.dispatchEvent(new CustomEvent('medicineRequestUpdate'));
};

interface SignalRProviderProps {
  children: ReactNode;
  stationName: string;
  onMedicineRequest: () => void;
}

let globalConnection: signalR.HubConnection | null = null;
let isInitialized = false;

export function SignalRProvider({ children, stationName, onMedicineRequest }: SignalRProviderProps) {
  const configRef = useRef<string>('');
  const stationNameRef = useRef(stationName);
  const onMedicineRequestRef = useRef(onMedicineRequest);

  useEffect(() => {
    console.log('[SignalR Provider] Station name changed from', stationNameRef.current, 'to', stationName);
    stationNameRef.current = stationName;
    console.log('[SignalR Provider] stationNameRef.current updated to:', stationNameRef.current);
  }, [stationName]);

  useEffect(() => {
    onMedicineRequestRef.current = onMedicineRequest;
  }, [onMedicineRequest]);

  if (!isInitialized) {
    isInitialized = true;

    const initializeConnection = async () => {
      try {
        const config = await loadConfig();
        configRef.current = config.domain;

        if (!config.domain) {
          console.error('Domain not found in config');
          return;
        }

        const connection = new signalR.HubConnectionBuilder()
          .withUrl(`${config.domain}/chatHub`)
          .withAutomaticReconnect()
          .configureLogging(signalR.LogLevel.Information)
          .build();

        connection.on('ReceiveMessage', (...args: any[]) => {
          console.log('[SignalR] Raw arguments received:', args);
          console.log('[SignalR] Number of arguments:', args.length);

          try {
            let messageData: string | null = null;

            if (args.length === 1) {
              messageData = args[0];
            } else if (args.length === 2) {
              console.log('[SignalR] Arg 0 (likely user):', args[0]);
              console.log('[SignalR] Arg 1 (likely message):', args[1]);
              messageData = args[1];
            } else if (args.length > 2) {
              console.log('[SignalR] Multiple arguments, using last one');
              messageData = args[args.length - 1];
            }

            if (!messageData) {
              console.warn('[SignalR] No message data found');
              return;
            }

            console.log('[SignalR] Message data to parse:', messageData);
            console.log('[SignalR] Message type:', typeof messageData);

            let parsedMessage: SignalRMessage;

            if (typeof messageData === 'string') {
              parsedMessage = JSON.parse(messageData);
            } else if (typeof messageData === 'object') {
              parsedMessage = messageData;
            } else {
              console.warn('[SignalR] Unknown message format');
              return;
            }

            console.log('[SignalR] Parsed message:', parsedMessage);

            const customEvent = new CustomEvent('ReceivedEvent', {
              detail: parsedMessage,
            });
            document.dispatchEvent(customEvent);

            if (typeof window.ChathubReceivedEvent === 'function') {
              window.ChathubReceivedEvent(parsedMessage);
            }

            if (parsedMessage.Method === 'med_request_info') {
              console.log('[SignalR] med_request_info detected');
              console.log('[SignalR] Data:', parsedMessage.Data);

              if (parsedMessage.Data && parsedMessage.Data.length > 0) {
                const requestData = parsedMessage.Data[0];
                console.log('[SignalR] Request data:', requestData);
                console.log('[SignalR] requestingUnit:', requestData.requestingUnit);
                console.log('[SignalR] Current station:', stationNameRef.current);

                console.log(stationNameRef.current);
                if (requestData.requestingUnit === stationNameRef.current) {
                  console.log('[SignalR] Station match! Adding to store');
                  medicineRequestsStore.push(requestData);

                  window.dispatchEvent(new CustomEvent('medicineRequestUpdate'));

                  onMedicineRequestRef.current();
                } else {
                  console.log('[SignalR] Station mismatch, ignoring');
                }
              }
            }

            if (parsedMessage.Result && parsedMessage.Result.includes('新增申領')) {
              console.log('[SignalR] Detected medicine request addition in Result');
              console.log('[SignalR] Processing request removal by temp_GUID');

              if (parsedMessage.Data && parsedMessage.Data.length > 0) {
                const guidsToRemove = parsedMessage.Data
                  .map((item: MedicineRequest) => item.temp_GUID)
                  .filter((guid: string | undefined) => guid !== undefined);

                console.log('[SignalR] GUIDs to remove:', guidsToRemove);
                console.log('[SignalR] Store before removal:', [...medicineRequestsStore]);

                let removedCount = 0;
                for (let i = medicineRequestsStore.length - 1; i >= 0; i--) {
                  const request = medicineRequestsStore[i];
                  if (request.temp_GUID && guidsToRemove.includes(request.temp_GUID)) {
                    console.log(`[SignalR] Removing request with GUID: ${request.temp_GUID}`);
                    medicineRequestsStore.splice(i, 1);
                    removedCount++;
                  }
                }

                if (removedCount > 0) {
                  console.log(`[SignalR] Removed ${removedCount} request(s) from store`);
                  console.log('[SignalR] Store after removal:', [...medicineRequestsStore]);
                  window.dispatchEvent(new CustomEvent('medicineRequestUpdate'));
                } else {
                  console.log('[SignalR] No matching requests found to remove');
                }
              }
            }
          } catch (error) {
            console.error('[SignalR] Failed to parse message:', error);
            console.error('[SignalR] Arguments:', args);
          }
        });

        connection.onreconnecting((error) => {
          console.log('[SignalR] Reconnecting...', error);
        });

        connection.onreconnected((connectionId) => {
          console.log('[SignalR] Reconnected with ID:', connectionId);
        });

        connection.onclose(async (error) => {
          console.log('[SignalR] Connection closed', error);
        });

        await connection.start();
        console.log('[SignalR] Connected successfully to:', `${config.domain}/chatHub`);
        console.log('[SignalR] Connection ID:', connection.connectionId);
        console.log('[SignalR] Connection State:', connection.state);
        globalConnection = connection;
      } catch (error) {
        console.error('SignalR connection error:', error);
      }
    };

    initializeConnection();
  }

  const sendMessage = async (message: string): Promise<void> => {
    try {
      let domain = configRef.current;
      if (!domain) {
        const config = await loadConfig();
        domain = config.domain;
        configRef.current = domain;
      }

      await fetch(`${domain}/api/Message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  };

  const contextValue: SignalRContextType = {
    sendMessage,
    medicineRequests: medicineRequestsStore,
  };

  return <SignalRContext.Provider value={contextValue}>{children}</SignalRContext.Provider>;
}

export function useSignalR() {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error('useSignalR must be used within SignalRProvider');
  }
  return context;
}

declare global {
  interface Window {
    ChathubReceivedEvent?: (message: SignalRMessage) => void;
  }
}

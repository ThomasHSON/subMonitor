import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { UserInfo } from '../types';
import { getLoginSessions } from '../services/userApi';

interface UserContextType {
  availableUsers: UserInfo[];
  selectedUser: UserInfo | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: Error | null;
  setSelectedUser: (user: UserInfo | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
  currentStationName: string;
}

const POLLING_INTERVAL = 2000;
const MIN_RETRY_INTERVAL = 2000;
const MAX_RETRY_INTERVAL = 10000;
const RETRY_BACKOFF_MULTIPLIER = 1.5;

export function UserProvider({ children, currentStationName }: UserProviderProps) {
  const [availableUsers, setAvailableUsers] = useState<UserInfo[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const nextPollTimeRef = useRef<number>(Date.now());
  const retryIntervalRef = useRef<number>(POLLING_INTERVAL);
  const pollingActiveRef = useRef<boolean>(true);
  const timeoutIdRef = useRef<number | null>(null);

  const fetchUserSessions = async () => {
    try {
      console.log('[UserContext] Fetching login sessions...');
      const sessions = await getLoginSessions(currentStationName);
      console.log('[UserContext] Sessions received:', sessions);

      setAvailableUsers(sessions);
      setError(null);
      retryIntervalRef.current = POLLING_INTERVAL;

      if (sessions.length === 0) {
        setSelectedUser(null);
      } else if (selectedUser === null || !sessions.find(s => s.guid === selectedUser.guid)) {
        setSelectedUser(sessions[0]);
      }

      return true;
    } catch (err) {
      console.error('[UserContext] Failed to fetch login sessions:', err);
      setError(err as Error);
      setAvailableUsers([]);
      setSelectedUser(null);

      retryIntervalRef.current = Math.min(
        retryIntervalRef.current * RETRY_BACKOFF_MULTIPLIER,
        MAX_RETRY_INTERVAL
      );
      console.log('[UserContext] Retry interval adjusted to:', retryIntervalRef.current);

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const schedulePoll = () => {
    if (!pollingActiveRef.current) return;

    const now = Date.now();
    const timeUntilNextPoll = Math.max(0, nextPollTimeRef.current - now);

    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = window.setTimeout(async () => {
      if (!pollingActiveRef.current) return;

      const currentTime = Date.now();
      if (currentTime >= nextPollTimeRef.current) {
        await fetchUserSessions();
        nextPollTimeRef.current = Date.now() + retryIntervalRef.current;
      }

      schedulePoll();
    }, timeUntilNextPoll || retryIntervalRef.current);
  };

  useEffect(() => {
    pollingActiveRef.current = true;
    nextPollTimeRef.current = Date.now();

    const init = async () => {
      await fetchUserSessions();
      nextPollTimeRef.current = Date.now() + retryIntervalRef.current;
      schedulePoll();
    };

    init();

    return () => {
      pollingActiveRef.current = false;
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current);
        timeoutIdRef.current = null;
      }
    };
  }, [currentStationName]);

  const contextValue: UserContextType = {
    availableUsers,
    selectedUser,
    isLoggedIn: selectedUser !== null,
    isLoading,
    error,
    setSelectedUser,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}

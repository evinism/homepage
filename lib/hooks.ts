import { useState, useMemo, useEffect } from "react";

export const usePersistentState = <T = any>(
  key: string,
  initial: T,
  pollInterval: number = 0
): [T, (newState: T) => void] => {
  const getStoredOrInitial = () =>
    JSON.parse(localStorage.getItem(lsKey) || JSON.stringify(initial));
  const lsKey = `persistentState/${key}`;
  const internalInitial = useMemo(getStoredOrInitial, [lsKey, initial]);

  const [state, setInternalState] = useState<T>(internalInitial);
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (pollInterval > 0) {
      intervalId = setInterval(
        () => setInternalState(getStoredOrInitial()),
        pollInterval
      );
    }
    return () => {
      if (pollInterval > 0) {
        clearInterval(intervalId);
      }
    };
  }, [pollInterval]);
  const setState = (newState: T) => {
    setInternalState(newState);
    localStorage.setItem(lsKey, JSON.stringify(newState));
  };

  return [state, setState];
};

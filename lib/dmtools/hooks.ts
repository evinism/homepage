import { useState, useMemo } from "react";

export const usePersistentState = <T = any>(
  key: string,
  initial: T
): [T, (newState: T) => void] => {
  const lsKey = `persistentState/${key}`;
  const internalInitial = useMemo(
    () => JSON.parse(localStorage.getItem(lsKey) || JSON.stringify(initial)),
    [lsKey, initial]
  );
  const [state, setInternalState] = useState<T>(internalInitial);
  const setState = (newState: T) => {
    setInternalState(newState);
    localStorage.setItem(lsKey, JSON.stringify(newState));
  };
  return [state, setState];
};

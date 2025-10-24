import { useEffect, useState } from "react";
import { MetronomeSpec, Metronome } from "./metronome";

const useMetronome = (spec: MetronomeSpec) => {
  const [metronome] = useState<Metronome>(() => new Metronome(spec));
  metronome.updateSpec(spec);

  const [beat, setBeat] = useState<number>(-1);
  useEffect(() => {
    const callback = (beat: CustomEvent<number>) => {
      setBeat(beat.detail);
    };
    metronome.subscribeToBeat(callback);
    return () => {
      metronome.unsubscribeFromBeat(callback);
    };
  }, []);
  return {
    metronome,
    beat,
  };
};

export default useMetronome;

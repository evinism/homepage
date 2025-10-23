import { Beat, BeatStrength } from "../types";
import methodOne from "./methodone";

export type BeatClick = {
  strength: BeatStrength;
  time: number;
};

type Result<T> =
  | {
      value: T;
      confidence: number;
    }
  | undefined;

export type RhythmInferenceMethod = (taps: BeatClick[]) => Result<{
  beats: Beat[];
  tempo: number;
}>;

export const methods = {
  methodOne,
};

export default methodOne;

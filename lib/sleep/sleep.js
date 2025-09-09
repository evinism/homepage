
import {requestPermissions} from '../faust/createNode.ts';
import {createFaustNode, connectToAudioInput} from '../faust/createNode.ts';

// Set to > 0 if the DSP is polyphonic
const FAUST_DSP_VOICES = 0;

// Declare faustNode as a global variable
let faustNode;
export const toggleActivate = async (audioContext) => {
  // Activate or suspend the AudioContext
  if (audioContext.state === "running") {
    await audioContext.suspend();
    return false;
  } else if (audioContext.state === "suspended") {
    await audioContext.resume();
    return true;
  }
};

// Called at load time
export const load = async (audioContext) => {
  // Create Faust node
  const result = await createFaustNode(
    audioContext,
    "slep",
    "/gen/sleep.wasm",
    "/gen/sleep.json",
    FAUST_DSP_VOICES
  );
  faustNode = result.faustNode; // Assign to the global variable
  if (!faustNode) throw new Error("Faust DSP not compiled");

  // Connect the Faust node to the audio output
  faustNode.connect(audioContext.destination);

  // Connect the Faust node to the audio input
  if (faustNode.getNumInputs() > 0) {
    await connectToAudioInput(audioContext, null, faustNode, null);
  }

  return faustNode;
};

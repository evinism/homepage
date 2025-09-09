
import {requestPermissions} from './createNode.ts';
import {createFaustNode, connectToAudioInput} from './createNode.ts';

// Set to > 0 if the DSP is polyphonic
const FAUST_DSP_VOICES = 0;

// Declare faustNode as a global variable
let faustNode;

// Create audio context activation button
/** @type {HTMLButtonElement} */


let sensorHandlersBound = false;
export const toggleActivate = async (audioContext) => {
    // Request permission for sensors
    await requestPermissions();

    // Activate sensor listeners
    if (!sensorHandlersBound) {
        await faustNode.startSensors();
        sensorHandlersBound = true;
    }

    // Activate or suspend the AudioContext
    if (audioContext.state === "running") {
        await audioContext.suspend();
        return false;
    } else if (audioContext.state === "suspended") {
        await audioContext.resume();
        if (FAUST_DSP_VOICES) play(faustNode);
        return true;
    }
}

// Called at load time
export const load = (async (audioContext) => {
    const play = (node) => {
        node.keyOn(0, 60, 100);
        setTimeout(() => node.keyOn(0, 64, 100), 1000);
        setTimeout(() => node.keyOn(0, 67, 100), 2000);
        setTimeout(() => node.allNotesOff(), 5000);
        setTimeout(() => play(node), 7000);
    }

    // Create Faust node
    const result = await createFaustNode(audioContext, "slep", FAUST_DSP_VOICES);
    faustNode = result.faustNode;  // Assign to the global variable
    if (!faustNode) throw new Error("Faust DSP not compiled");

    // Connect the Faust node to the audio output
    faustNode.connect(audioContext.destination);

    // Connect the Faust node to the audio input
    if (faustNode.getNumInputs() > 0) {
        await connectToAudioInput(audioContext, null, faustNode, null);
    }
});

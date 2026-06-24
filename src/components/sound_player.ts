import * as Tone from "tone";

const synth = new Tone.Synth().toDestination();

export function SoundPlayer(noteName:string, duration:string = "8n") {
    synth.triggerAttackRelease(noteName, duration);
}
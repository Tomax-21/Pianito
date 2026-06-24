import * as Tone from "tone";

let synth: Tone.Synth | null = null;

export async function SoundPlayer(noteName:string, duration:string = "8n") {
    if (!synth) {
        synth = new Tone.Synth().toDestination()
    }
    if (Tone.getContext().state !== "running") { //redemarre en cas de prblm
        await Tone.start()
    }

    
    synth.triggerAttackRelease(noteName, duration);
}
import * as Tone from "tone";

let synth: Tone.Synth | null = null;

export function init_sound_player_synth() {
    synth = new Tone.Synth().toDestination()
}

export async function SoundPlayer(noteName:string, duration:string = "8n") {
    if (!synth) {
        init_sound_player_synth()
    }
    if (Tone.getContext().state !== "running") { //redemarre en cas de prblm
        await Tone.start()
    }

    
    synth!.triggerAttackRelease(noteName, duration);
}
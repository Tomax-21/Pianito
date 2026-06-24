import "../../css/piano.css"
import type {  PianoProps } from "../piano_types"
import { PianoOctave } from "./pianoOctave"

export function Piano({onNotePlayed}: PianoProps) {
    return (
        <div className="piano">
            <PianoOctave octave_number={0} is_first_octave={true} onNoteTriggered={onNotePlayed}/>
            <PianoOctave octave_number={1} onNoteTriggered={onNotePlayed}/>
            <PianoOctave octave_number={2} onNoteTriggered={onNotePlayed}/>
            <PianoOctave octave_number={3} onNoteTriggered={onNotePlayed}/>
            <PianoOctave octave_number={4} onNoteTriggered={onNotePlayed}/>
            <PianoOctave octave_number={5} onNoteTriggered={onNotePlayed}/>
            <PianoOctave octave_number={6} onNoteTriggered={onNotePlayed}/>
            <PianoOctave octave_number={7} onNoteTriggered={onNotePlayed}/>
            <PianoOctave octave_number={8} is_last_octave={true} onNoteTriggered={onNotePlayed}/>
        </div>
    )
}
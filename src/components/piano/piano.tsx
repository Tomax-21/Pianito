import "../../css/piano.css"
import type {  PianoProps } from "./piano_types"
import { PianoOctave } from "./pianoOctave"

export function Piano({onNotePlayed}: PianoProps) {
    const octaves = [0,1,2,3,4,5,6,7,8]
    
    return (
        <div className="piano">
            {octaves.map((num) => (
                <PianoOctave
                    key={num}
                    octave_number={num}
                    is_first_octave={num===0}
                    is_last_octave={num===8}
                    onNoteTriggered={onNotePlayed}
                />
            ))}

        </div>
    )
}
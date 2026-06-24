import "../../css/piano.css"
import { PianoOctave } from "./pianoOctave"

export function Piano() {
    return (
        <div className="piano">
            <PianoOctave octave_number={0} is_first_octave={true}/>
            <PianoOctave octave_number={1}/>
            <PianoOctave octave_number={2}/>
            <PianoOctave octave_number={3}/>
            <PianoOctave octave_number={4}/>
            <PianoOctave octave_number={5}/>
            <PianoOctave octave_number={6}/>
            <PianoOctave octave_number={7}/>
            <PianoOctave octave_number={8} is_last_octave={true}/>



        </div>
    )
}
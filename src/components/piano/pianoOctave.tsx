import type { pianoOctaveType } from "../piano_types";
import { PianoKeyContainer } from "./pianoKeyContainer";


export function PianoOctave({octave_number, is_first_octave=false, is_last_octave=false}:pianoOctaveType) {

    if (is_last_octave) {
        return (
            <PianoKeyContainer name_white={`C${octave_number}`} has_black={false}/>
        )
    }    
    else if (is_first_octave) {
        return (
            <> 
            <PianoKeyContainer name_white={`A${octave_number}`} has_black={true}/>
            <PianoKeyContainer name_white={`B${octave_number}`}/>
            </>
        )
    }

    return (
        <>
            <PianoKeyContainer name_white={`C${octave_number}`} has_black={true}/>
            <PianoKeyContainer name_white={`D${octave_number}`} has_black={true}/>
            <PianoKeyContainer name_white={`E${octave_number}`}/>
            <PianoKeyContainer name_white={`F${octave_number}`} has_black={true}/>
            <PianoKeyContainer name_white={`G${octave_number}`} has_black={true}/>

            <PianoKeyContainer name_white={`A${octave_number}`} has_black={true}/>
            <PianoKeyContainer name_white={`B${octave_number}`}/>
        </>
    )
}
import type { pianoOctaveType } from "../piano_types";
import { PianoKeyContainer } from "./pianoKeyContainer";


export function PianoOctave({octave_number}:pianoOctaveType) {
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
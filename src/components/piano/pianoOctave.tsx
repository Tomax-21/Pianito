import type { pianoOctaveType } from "./piano_types";
import { PianoKeyContainer } from "./pianoKeyContainer";



export function PianoOctave({octave_number, is_first_octave=false, is_last_octave=false, onNoteTriggered, target_note}:pianoOctaveType) {


    if (is_last_octave) {
        return (
            <PianoKeyContainer name_white={`C${octave_number}`} target_note={target_note} has_black={false} onKeyClicked={onNoteTriggered}/>
        )
    }    
    else if (is_first_octave) {
        return (
            <> 
            <PianoKeyContainer name_white={`A${octave_number}`} target_note={target_note} has_black={true} onKeyClicked={onNoteTriggered}/>
            <PianoKeyContainer name_white={`B${octave_number}`} target_note={target_note} onKeyClicked={onNoteTriggered}/>
            </>
        )
    }

    return (
        <>
            <PianoKeyContainer name_white={`C${octave_number}`} target_note={target_note} has_black={true} onKeyClicked={onNoteTriggered}/>
            <PianoKeyContainer name_white={`D${octave_number}`} target_note={target_note} has_black={true} onKeyClicked={onNoteTriggered}/>
            <PianoKeyContainer name_white={`E${octave_number}`} target_note={target_note} onKeyClicked={onNoteTriggered}/>
            <PianoKeyContainer name_white={`F${octave_number}`} target_note={target_note} has_black={true} onKeyClicked={onNoteTriggered}/>
            <PianoKeyContainer name_white={`G${octave_number}`} target_note={target_note} has_black={true} onKeyClicked={onNoteTriggered}/>

            <PianoKeyContainer name_white={`A${octave_number}`} target_note={target_note} has_black={true} onKeyClicked={onNoteTriggered}/>
            <PianoKeyContainer name_white={`B${octave_number}`} target_note={target_note} onKeyClicked={onNoteTriggered}/>
        </>
    )
}
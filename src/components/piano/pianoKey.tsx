import { areEnharmonic, capitalize } from "../../utils/note_comparison";
import { piano_key_color, type PianoKeyProps } from "./piano_types";




export function PianoKey({name, color,active=false, target_note, onClick}: PianoKeyProps) {
    
    if (name && target_note) {
        active = areEnharmonic(capitalize(name), capitalize(target_note))
    }

    
    return (
        <button onClick={onClick} className={`key ${color} ${active ? 'active' : ''}`}>
            <p>{color !== piano_key_color.BLACK ? name : ''}</p>
        </button>
    )
}
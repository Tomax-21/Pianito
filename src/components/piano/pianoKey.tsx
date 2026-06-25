import { areEnharmonic } from "../../utils/note_comparison";
import type { PianoKeyProps } from "./piano_types";




export function PianoKey({name, color,active=false, target_note, onClick}: PianoKeyProps) {
    
    if (name && target_note) {
        active = areEnharmonic(name.toUpperCase(), target_note.toUpperCase())
    }

    
    return (
        <button onClick={onClick} className={`key ${color} ${active ? 'active' : ''}`}>
            <p>{name ?? ''}</p>
        </button>
    )
}
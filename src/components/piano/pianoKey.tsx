import { areEnharmonic, capitalize } from "../../utils/note_comparison";
import { keys_name_status, piano_key_color, type PianoKeyProps } from "./piano_types";




export function PianoKey({name, color,active=false, target_note,show_keys_name, onClick}: PianoKeyProps) {
    
    if (name && target_note) {
        active = areEnharmonic(capitalize(name), capitalize(target_note))
    }

    return (
        <button onClick={onClick} className={`key ${color} ${active ? 'active' : ''}`}>
            <p>{
            (color !== piano_key_color.BLACK && show_keys_name === keys_name_status.SHOW) ? 
                name : 
                
                (show_keys_name === keys_name_status.SHOWONLYDO && name?.includes("C") && color !== piano_key_color.BLACK) 
                    ? name: ""
            
            }
            
            </p>
        </button>
    )
}
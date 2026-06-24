import type { PianoKeyProps } from "../piano_types";




export function PianoKey({name, color, active=false, onClick}: PianoKeyProps) {
    return (
        <button onClick={onClick} className={`key ${color} ${active ? 'active' : ''}`}>
            <p>{name ?? ''}</p>
        </button>
    )
}
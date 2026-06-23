import type { piano_key_type } from "../piano_types";


export function PianoKey({name, color, active=false}: piano_key_type) {
    return (
        <div className={`key ${color} ${active ? 'active' : ''}`}>
            {name}
        </div>
    )
}
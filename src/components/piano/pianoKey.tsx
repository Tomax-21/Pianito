import type { piano_key_type } from "../piano_types";


export function PianoKey({name, color}: piano_key_type) {
    return (
        <div>Test key blanceh {name} {color}</div>
    )
}
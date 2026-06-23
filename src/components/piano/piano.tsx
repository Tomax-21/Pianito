import { piano_key_color } from "../piano_types";
import { PianoKey } from "./pianoKey";


export function Piano() {
    return (
        <div>Test piano

            <PianoKey name="C1" color={piano_key_color.WHITE}/>
        </div>
    )
}
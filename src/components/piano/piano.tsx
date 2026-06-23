import { piano_key_color } from "../piano_types";
import { PianoKey } from "./pianoKey";

import "../../css/piano.css"

export function Piano() {
    return (
        <div className="piano">
            <PianoKey name="C1" color={piano_key_color.WHITE}/>
            <PianoKey name="C2" color={piano_key_color.WHITE}/>
            <PianoKey name="C3" color={piano_key_color.WHITE}/>
            <PianoKey name="C4" color={piano_key_color.BLACK}/>
        </div>
    )
}
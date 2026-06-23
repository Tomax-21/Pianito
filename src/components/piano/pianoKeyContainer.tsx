
import "../../css/piano.css"
import { piano_key_color, type pianoKeyContainerType } from "../piano_types"
import { PianoKey } from "./pianoKey"


export function PianoKeyContainer({name_white, has_black=false}:pianoKeyContainerType) {
    return (
        <div className="key-container">
            <PianoKey name={name_white} color={piano_key_color.WHITE}/>

            {has_black && (
                <PianoKey color={piano_key_color.BLACK}/>
            )}
        </div>
    )
}
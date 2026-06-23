
import "../../css/piano.css"
import { piano_key_color, type pianoKeyContainerType } from "../piano_types"
import { PianoKey } from "./pianoKey"


export function pianoKeyContainer({name_white, name_black}:pianoKeyContainerType) {
    return (
        <div className="key-container">
            <PianoKey name={name_white} color={piano_key_color.WHITE}/>

            {name_black ?? (
                <PianoKey name={name_black!} color={piano_key_color.BLACK}/>
            )}
        </div>
    )
}
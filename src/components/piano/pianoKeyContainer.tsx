
import "../../css/piano.css"
import { piano_key_color, type pianoKeyContainerType } from "../piano_types"
import { PianoKey } from "./pianoKey"


export function PianoKeyContainer({name_white, has_black=false, onKeyClicked}:pianoKeyContainerType) {
    
    const name_black = name_white[0]+"#"+name_white[1]

    return (
        <div className="key-container">
            <PianoKey name={name_white} color={piano_key_color.WHITE} onClick={() => onKeyClicked(name_white)}/>

            {has_black && (
                <PianoKey color={piano_key_color.BLACK} onClick={() => onKeyClicked(name_black)}/>
            )}
        </div>
    )
}
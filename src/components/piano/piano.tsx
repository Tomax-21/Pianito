import "../../css/piano.css"
import { PianoKeyContainer } from "./pianoKeyContainer";

export function Piano() {
    return (
        <div className="piano">
            <PianoKeyContainer name_white="C1" name_black="C#1"/>
            <PianoKeyContainer name_white="D1" name_black="D#1"/>
            <PianoKeyContainer name_white="E1"/>

        </div>
    )
}
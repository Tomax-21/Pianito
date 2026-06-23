import "../../css/piano.css"
import { PianoKeyContainer } from "./pianoKeyContainer";

export function Piano() {
    return (
        <div className="piano">
            <PianoKeyContainer name_white="C1" has_black={true}/>
            <PianoKeyContainer name_white="D1" has_black={true}/>
            <PianoKeyContainer name_white="E1"/>
            <PianoKeyContainer name_white="F1" has_black={true}/>
            <PianoKeyContainer name_white="G1" has_black={true}/>
            <PianoKeyContainer name_white="A1" has_black={true}/>
            <PianoKeyContainer name_white="B1"/>
            <PianoKeyContainer name_white="C2" has_black={true}/>



        </div>
    )
}
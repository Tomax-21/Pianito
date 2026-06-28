import { useState } from "react"
import "../../css/piano.css"
import {  keys_name_status, type PianoProps } from "./piano_types"
import { PianoFrame } from "./pianoFrame"
import { PianoOctave } from "./pianoOctave"

export function Piano({onNotePlayed, onHelpRequested, onRefreshRequested,onUseAudioPitchRequested, target_note, isMicroUsed}: PianoProps) {
    const octaves = [0,1,2,3,4,5,6,7,8]

    const [showKeysName, setShowKeysName] = useState<keys_name_status>(keys_name_status.SHOW)
    

    const handleShowKeyNameButtonClicked= () => {
        console.log(showKeysName)
    }
    return (
        <div className="piano">

            <PianoFrame showKeysName={showKeysName} onShowKeyNameButtonClick={handleShowKeyNameButtonClicked} isMicroUsed={isMicroUsed} onHelpButtonClick={onHelpRequested} onRefreshButtonClick={onRefreshRequested} onMicButtonClick={onUseAudioPitchRequested}/>

            <div className="piano-keyboard">
                {octaves.map((num) => (
                    <PianoOctave
                        key={num}
                        octave_number={num}
                        is_first_octave={num===0}
                        is_last_octave={num===8}
                        onNoteTriggered={onNotePlayed}
                        target_note={target_note}
                    />
                ))}
            </div>
        </div>
       
    )
}
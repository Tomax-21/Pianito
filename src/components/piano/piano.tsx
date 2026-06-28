import { useState } from "react"
import "../../css/piano.css"
import {  keys_name_status, type PianoProps } from "./piano_types"
import { PianoFrame } from "./pianoFrame"
import { PianoOctave } from "./pianoOctave"

export function Piano({onNotePlayed, onHelpRequested, onRefreshRequested,onUseAudioPitchRequested, target_note, isMicroUsed}: PianoProps) {
    const octaves = [0,1,2,3,4,5,6,7,8]

    const [showKeysName, setShowKeysName] = useState<keys_name_status>(keys_name_status.SHOW)

    const [showKeybord, setShowKeyboard] = useState<boolean>(true)
    

    const handleShowKeyNameButtonClicked= () => {
        if (showKeysName === keys_name_status.SHOW) {
            setShowKeysName(keys_name_status.HIDE)
        }
        else if (showKeysName === keys_name_status.HIDE) {
            setShowKeysName(keys_name_status.SHOWONLYDO)
        } else {
            setShowKeysName(keys_name_status.SHOW)
        }
    }

    const handleShowKeyboardButtonClicked = () => {
        setShowKeyboard(!showKeybord)
    }

    console.log(showKeybord)

    return (
        <div className="piano">

            <PianoFrame showKeyboard={showKeybord} onShowKeyboardButtonClick={handleShowKeyboardButtonClicked} showKeysName={showKeysName} onShowKeyNameButtonClick={handleShowKeyNameButtonClicked} isMicroUsed={isMicroUsed} onHelpButtonClick={onHelpRequested} onRefreshButtonClick={onRefreshRequested} onMicButtonClick={onUseAudioPitchRequested}/>

            <div className="piano-keyboard">
                {octaves.map((num) => (
                    <PianoOctave
                        key={num}
                        octave_number={num}
                        is_first_octave={num===0}
                        is_last_octave={num===8}
                        onNoteTriggered={onNotePlayed}
                        target_note={target_note}
                        show_keys_name={showKeysName}
                    />
                ))}
            </div>
        </div>
       
    )
}
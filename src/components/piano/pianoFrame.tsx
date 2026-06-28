import { Captions, CaptionsOff, HelpCircle, Mic, MicOff, RefreshCw } from "lucide-react";
import { keys_name_status, type PianoFrameProps } from "./piano_types";

export function PianoFrame({onHelpButtonClick, onRefreshButtonClick, onMicButtonClick, onShowKeyNameButtonClick, isMicroUsed, showKeysName}: PianoFrameProps) {
    return (
        <div className={`piano-frame ${isMicroUsed ? 'use-mic':''}`}>

            {showKeysName === keys_name_status.SHOW ? (
                <Captions className="icon" onClick={onShowKeyNameButtonClick}/>
            ) : showKeysName === keys_name_status.HIDE ? (
                <CaptionsOff className="icon" onClick={onShowKeyNameButtonClick}/>
            ) : (
                <></>
            )}

            {isMicroUsed ? (
                <Mic className="icon mic-icon" onClick={onMicButtonClick}/>

            ): (
                <MicOff className="icon mic-icon" onClick={onMicButtonClick}/>
            )}
            <RefreshCw className="icon refresh-icon" onClick={onRefreshButtonClick}/>
            <HelpCircle className="icon help-icon" onClick={onHelpButtonClick}/>
        </div>
    )
}
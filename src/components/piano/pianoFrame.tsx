import { Captions, CaptionsOff, HelpCircle, Mic, MicOff, RefreshCw } from "lucide-react";
import { keys_name_status, type PianoFrameProps } from "./piano_types";
import ShowOnlyDoIcon from "../../assets/icons/show-only-do-keys.svg";

export function PianoFrame({onHelpButtonClick, onRefreshButtonClick, onMicButtonClick, onShowKeyNameButtonClick, isMicroUsed, showKeysName}: PianoFrameProps) {
    return (
        <div className={`piano-frame ${isMicroUsed ? 'use-mic':''}`}>

            {isMicroUsed ? (
                <Mic className="icon mic-icon" onClick={onMicButtonClick}/>

            ): (
                <MicOff className="icon mic-icon" onClick={onMicButtonClick}/>
            )}

            <div className="right-part">
                {showKeysName === keys_name_status.SHOW ? (
                    <Captions className="icon show-key-name" onClick={onShowKeyNameButtonClick}/>
                ) : showKeysName === keys_name_status.HIDE ? (
                    <CaptionsOff className="icon show-key-name" onClick={onShowKeyNameButtonClick}/>
                ) : (

                    <img src={ShowOnlyDoIcon} className="icon show-key-name" onClick={onShowKeyNameButtonClick}/>
                )}
                <RefreshCw className="icon refresh-icon" onClick={onRefreshButtonClick}/>
                <HelpCircle className="icon help-icon" onClick={onHelpButtonClick}/>
            </div>

            
            
        </div>
    )
}
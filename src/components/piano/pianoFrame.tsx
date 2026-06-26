import { HelpCircle, Mic, MicOff, RefreshCw } from "lucide-react";
import type { PianoFrameProps } from "./piano_types";

export function PianoFrame({onHelpButtonClick, onRefreshButtonClick, onMicButtonClick, isMicroUsed}: PianoFrameProps) {
    return (
        <div className={`piano-frame ${isMicroUsed ? 'use-mic':''}`}>
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
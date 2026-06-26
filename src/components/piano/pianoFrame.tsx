import { HelpCircle, Mic, RefreshCw } from "lucide-react";
import type { PianoFrameProps } from "./piano_types";

export function PianoFrame({onHelpButtonClick, onRefreshButtonClick, onMicButtonClick}: PianoFrameProps) {
    return (
        <div className="piano-frame">
            <Mic className="icon mic-icon" onClick={onMicButtonClick}/>
            <RefreshCw className="icon refresh-icon" onClick={onRefreshButtonClick}/>
            <HelpCircle className="icon help-icon" onClick={onHelpButtonClick}/>
        </div>
    )
}
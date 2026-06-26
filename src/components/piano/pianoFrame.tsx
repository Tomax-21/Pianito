import { HelpCircle, RefreshCw } from "lucide-react";
import type { PianoFrameProps } from "./piano_types";

export function PianoFrame({onHelpButtonClick, onRefreshButtonClick}: PianoFrameProps) {
    return (
        <div className="piano-frame">
            <RefreshCw className="icon refresh-icon" onClick={onRefreshButtonClick}/>
            <HelpCircle className="icon help-icon" onClick={onHelpButtonClick}/>
        </div>
    )
}
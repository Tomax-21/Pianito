import { HelpCircle } from "lucide-react";
import type { PianoFrameProps } from "./piano_types";

export function PianoFrame({onHelpButtonClick}: PianoFrameProps) {
    return (
        <div className="piano-frame">
            <HelpCircle className="icon help-icon" onClick={onHelpButtonClick}/>
        </div>
    )
}
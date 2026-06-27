import { useEffect, useRef } from "react";

export function useAudioPitch(isListening: boolean, onNoteDetected: (note: string) => void) {

    if (isListening)
    onNoteDetected("coucou")
    

}
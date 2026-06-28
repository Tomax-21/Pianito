import { useEffect, useRef } from "react";


function rms(buffer: Float32Array): number {
    let sum = 0
    for (let i = 0; i < buffer.length; i++) {
        sum += buffer[i] * buffer[i]
    }
    return Math.sqrt(sum / buffer.length)
}

export function useAudioPitch(isListening: boolean, onNoteDetected: (note: string) => void) {

    if (isListening)
    onNoteDetected("coucou")


    useEffect(()=> {
        if (!isListening) {
            return
        }
   

        async function start() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: false,
                        noiseSuppression: false,
                        autoGainControl: false,
                    }
                })

                const audioContext = new AudioContext();

                const source = audioContext.createMediaStreamSource(stream);

                const analyser = audioContext.createAnalyser();
                source.connect(analyser);

                const buffer = new Float32Array(2048);
            } catch {

            }
        }
        start()
    }, [isListening])
    

}
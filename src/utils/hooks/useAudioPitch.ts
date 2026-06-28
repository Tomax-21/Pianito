import { useEffect, useRef } from "react";

const BUFFER_SIZE = 2048;
// Seuil de confiance YIN : en dessous = note détectée, au-dessus = silence/bruit
const YIN_THRESHOLD = 0.15;
const SILENCE_THRESHOLD = 0.01;



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
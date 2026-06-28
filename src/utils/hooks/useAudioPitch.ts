import { useEffect, useRef } from "react";
import { yin } from "../yin";
import { frequencyToNoteName } from "../note_detector";

const BUFFER_SIZE = 2048;
// Seuil de confiance YIN : en dessous = note détectée, au-dessus = silence/bruit
export const YIN_THRESHOLD = 0.15;
const SILENCE_THRESHOLD = 0.01;



function rms(buffer: Float32Array): number {
    let sum = 0
    for (let i = 0; i < buffer.length; i++) {
        sum += buffer[i] * buffer[i]
    }
    return Math.sqrt(sum / buffer.length)
}

export function useAudioPitch(isListening: boolean, onNoteDetected: (note: string) => void) {

    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const animFrameRef = useRef<number | null>(null);
    const onNoteDetectedRef = useRef(onNoteDetected);

    useEffect(() => {
        onNoteDetectedRef.current = onNoteDetected;
    }, [onNoteDetected]);


    useEffect(()=> {
        if (!isListening) {
            cleanup()
            return
        }

        let cancelled = false
   

        async function start() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: false,
                        noiseSuppression: false,
                        autoGainControl: false,
                    }
                })

                if (cancelled) {
                    stream.getTracks().forEach(t => t.stop())
                    return
                }

                streamRef.current = stream;


                const audioContext = new AudioContext();
                audioContextRef.current = audioContext

                const source = audioContext.createMediaStreamSource(stream);

                const analyser = audioContext.createAnalyser();
                analyser.fftSize = BUFFER_SIZE
                analyser.smoothingTimeConstant = 0 //pas de smoothing, on recupere la val instant
                
                source.connect(analyser);

                const buffer = new Float32Array(BUFFER_SIZE);

               
                    
                function detect() {
                    if (!analyserRef.current) return

                    analyserRef.current.getFloatTimeDomainData(buffer)

                    //traite que le signal est assez fort
                    if (rms(buffer) > SILENCE_THRESHOLD) {
                        const frequency = yin(buffer, audioContext.sampleRate);
                        if (frequency > 0) {
                            const note = frequencyToNoteName(frequency);
                            if (note) onNoteDetectedRef.current(note);
                        }
                    }

                    animFrameRef.current = requestAnimationFrame(detect);


                }
                detect();


            } catch (err) {
                console.log("err acces micro")
            }
        }
        start()

        return () => {
            cancelled = true
            cleanup()
        }
    }, [isListening])
    

    function cleanup() {
        if (animFrameRef.current !== null) {
            cancelAnimationFrame(animFrameRef.current)
            animFrameRef.current = null
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop())
            streamRef.current = null
        }
        if (audioContextRef.current) {
            audioContextRef.current.close()
            audioContextRef.current = null
        }
        analyserRef.current = null
    }
}
import { useEffect, useRef } from "react";

export function useAudioPitch(isListening: boolean) {

    console.log("bojnour", isListening)

    // On utilise des "refs" pour garder en mémoire nos variables d'une image à l'autre
    const streamRef = useRef<MediaStream | null>(null);
    const audioCtxRef = useRef<AudioContext | null>(null);
    const animationRef = useRef<number | null>(null);


    

    useEffect(() => {
        if (!isListening) {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
            if (audioCtxRef.current) audioCtxRef.current.close();
            return;
        }
        async function startMicrophone() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                streamRef.current = stream;

                // analyseur audio natif navigateur
                const audioContext = new AudioContext();
                audioCtxRef.current = audioContext;

                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();

                analyser.fftSize = 2048;
                source.connect(analyser);

                const buffer = new Float32Array(analyser.fftSize);

                function loop() {
                    // On remplit le buffer avec le son du micro À CET INSTANT PRÉCIS
                    analyser.getFloatTimeDomainData(buffer);
                    
                    console.log(buffer); 

                    // On demande au navigateur de relancer la fonction "loop" à la prochaine image d'écran (60fps)
                    animationRef.current = requestAnimationFrame(loop);
                }

                // On lance la boucle pour la première fois
                loop();

            } catch {
                console.log("erreur micro")
            }
            
        }
        startMicrophone()
        // ÉTAPE 4 : Nettoyage automatique si le composant React est détruit
        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
            if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
            if (audioCtxRef.current) audioCtxRef.current.close();
        };
    }, [isListening])


}
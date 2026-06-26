export function useAudioPitch(isListening: boolean) {

    console.log("bojnour", isListening)


    async function startMicrophone() {

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // analyseur audio natif navigateur
        const audioContext = new AudioContext();

        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 2048;
        source.connect(analyser);

        const buffer = new Float32Array(analyser.fftSize);

        analyser.getFloatTimeDomainData(buffer);

        console.log(buffer);

    }
    startMicrophone()


}
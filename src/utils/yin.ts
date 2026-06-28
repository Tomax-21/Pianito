import { YIN_THRESHOLD } from "./hooks/useAudioPitch";

/**
 * Algorithme YIN pour la détection monophonique de pitch.
 * Retourne la fréquence fondamentale en Hz, ou -1 si aucune détectée.
 * 
 * Principe : calcule la différence de fonction autocorrélation normalisée
 * puis cherche le premier minimum local sous le seuil de confiance.
 */
export function yin(buffer: Float32Array, sampleRate: number): number {
    const halfBufferSize = Math.floor(buffer.length / 2);

    // Étape 1 : calcul de la différence (difference function)
    const yinBuffer = new Float32Array(halfBufferSize);
    for (let tau = 0; tau < halfBufferSize; tau++) {
        let sum = 0;
        for (let i = 0; i < halfBufferSize; i++) {
            const delta = buffer[i] - buffer[i + tau];
            sum += delta * delta;
        }
        yinBuffer[tau] = sum;
    }

    // Étape 2 : normalisation cumulative de la moyenne (CMNDF)
    // Évite les faux positifs sur les harmoniques
    yinBuffer[0] = 1;
    let runningSum = 0;
    for (let tau = 1; tau < halfBufferSize; tau++) {
        runningSum += yinBuffer[tau];
        yinBuffer[tau] *= tau / runningSum;
    }

    // Étape 3 : recherche du premier minimum sous le seuil
    let tau = 2;
    while (tau < halfBufferSize) {
        if (yinBuffer[tau] < YIN_THRESHOLD) {
            // Cherche le minimum local réel (pas juste le premier point sous le seuil)
            while (tau + 1 < halfBufferSize && yinBuffer[tau + 1] < yinBuffer[tau]) {
                tau++;
            }

            // Étape 4 : interpolation parabolique pour plus de précision
            const betterTau = parabolicInterpolation(yinBuffer, tau);
            return sampleRate / betterTau;
        }
        tau++;
    }

    return -1; // Pas de pitch détecté
}

/**
 * Interpolation parabolique du minimum : affine la précision du tau trouvé
 * entre deux samples discrets → réduit l'erreur de ±0.5 sample.
 */
function parabolicInterpolation(yinBuffer: Float32Array, tau: number): number {
    if (tau === 0 || tau >= yinBuffer.length - 1) return tau;
    const s0 = yinBuffer[tau - 1];
    const s1 = yinBuffer[tau];
    const s2 = yinBuffer[tau + 1];
    const adjustment = (s2 - s0) / (2 * (2 * s1 - s2 - s0));
    return tau + adjustment;
}
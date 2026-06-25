//note au format classique en entrer
const ENHARMONIC_MAP: Record<string, string> = {
    "C#": "Db", "Db": "C#",
    "D#": "Eb", "Eb": "D#",
    "F#": "Gb", "Gb": "F#",
    "G#": "Ab", "Ab": "G#",
    "A#": "Bb", "Bb": "A#",
};

export function areEnharmonic(note1:string, note2:string) {

    if (note1 === note2) return true

    const nameA = note1.slice(0, -1)
    const octaveA  = note1.slice(-1)

    const nameB = note2.slice(0,-1)
    const octaveB = note2.slice(-1)

    if (octaveA !== octaveB) return false
    
    return ENHARMONIC_MAP[nameA] === nameB
}
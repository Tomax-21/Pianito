import { vexflowNoteToClassicNote } from "./note_conversion";

//note au format classique en entrer
const ENHARMONIC_MAP: Record<string, string> = {
    "C#": "Db", "Db": "C#",
    "D#": "Eb", "Eb": "D#",
    "F#": "Gb", "Gb": "F#",
    "G#": "Ab", "Ab": "G#",
    "A#": "Bb", "Bb": "A#",
};

export function areEnharmonic(note1:string, note2:string) {
    if (!isNoteSyntaxClassic(note1) || !isNoteSyntaxClassic(note2)) {
        if (isNoteSyntaxVexFlow(note1) && isNoteSyntaxVexFlow(note2)) {
            note1 = vexflowNoteToClassicNote(note1).toUpperCase()
            note2 = vexflowNoteToClassicNote(note2).toUpperCase()
        }else {
            return false
        }
    }

    if (note1 === note2) return true

    const nameA = note1.slice(0, -1)
    const octaveA  = note1.slice(-1)

    const nameB = note2.slice(0,-1)
    const octaveB = note2.slice(-1)

    if (octaveA !== octaveB) return false

    return ENHARMONIC_MAP[nameA] === nameB
}


export function isNoteSyntaxClassic(note: string):boolean {
    const classicNoteRegex = /^[A-G][#b]?[0-8]$/;

    return classicNoteRegex.test(note)
}

export function isNoteSyntaxVexFlow(note : string): boolean {
    const vexflowRegex = /^[a-g][#b]?\/[0-8]$/
    return vexflowRegex.test(note)
}
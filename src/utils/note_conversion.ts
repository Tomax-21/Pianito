export const note = {
    "A": "LA",
    "B": "SI",
    "C": "DO",
    "D": "RE",
    "E": "MI",
    "F": "FA",
    "G": "SOL",
}

export type EnglishNotes = keyof typeof note;
export type FrenchNotes = typeof note[EnglishNotes];

export function getFrenchNoteName(technicalNote: string): string {

    const firstLetter = technicalNote[0] as EnglishNotes
    const frenchName = note[firstLetter] || ""

    if (technicalNote.includes("#")) {
        return `${frenchName}#`
    }
    
    return frenchName.toUpperCase()
}

export function vexflowNoteToClassicNote(note: string) {
    /**
     * c/4 => C4
     * f#/4 => F#4
    */
   return note.toUpperCase().replaceAll("/", "")

}
export function classicNoteToVewflowNote(note: string) {
    /**
     * C4 => c/4
     * F#4 => F#4
     * C => C/4
     */

    return `${note.toUpperCase().slice(0, -1)}/${note.toUpperCase().slice(-1) ?? 4}`;
}
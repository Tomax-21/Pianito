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
    
    return frenchName
}

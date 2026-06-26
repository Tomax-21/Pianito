import { note_status } from "../components/piano/piano_types";
import { capitalize } from "./note_comparison";

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
     * fb/5 => FB4
    */
   return capitalize(note).replaceAll("/", "")

}
export function classicNoteToVewflowNote(note: string) {
    /**
     * C4 => c/4
     * F#4 => F#4
     * C => C/4
     */

    return `${capitalize(note).slice(0, -1)}/${capitalize(note).slice(-1) ?? 4}`;
}

export function prepareNotesForTrainer(notes: Array<string>) {
    /**
     * [["C4"], ["D4"] =>
     * [["C4", note_status.NEUTRE], ["D4", note_status.NEUTRE]]
     */

    let final_liste = []
    for (const note of notes) {
        final_liste.push([note,note_status.NEUTRE])
    }

    return final_liste
}
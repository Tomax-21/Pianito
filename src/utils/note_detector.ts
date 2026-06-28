// 1 octave = freq /2
// note de ref : A4 = 440Hz (note MIDI = 69)
export function frequencyToNoteName(frequency: number): string {
    const noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]; // 12 notes
    
    // Formule mathématique internationale de conversion
    //on fonctionne en MIDI : A4 = 69

    // /log(2) : converti par rapport aux octaves : divise par rapport au nb d'octave
    const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2)); // le nb de demi ton d'ecart entre la note et le 440
    const normalizedNote = Math.round(noteNum) + 69;
    
    // Si la fréquence donne n'importe quoi (trop aigu / trop grave), on sécurise
    if (normalizedNote < 0 || normalizedNote > 120) return "";

    const noteIndex = normalizedNote % 12;
    const octave = Math.floor(normalizedNote / 12) - 1;
    
    return noteStrings[noteIndex] + octave;

}

function getNoteOccurenceInList(notes: string[]): Record<string, number>{
    const counts: Record<string, number> = {}
    for (const note of notes) {
        if (counts[note] === undefined) {
            counts[note] = 0
        }
        counts[note] = counts[note] + 1
    }

    return counts
}

function getMostReccurentNoteInRecord(counts:Record<string, number>) {
    let winnerNote = "";
    let winnerCount = 0;
    for (const note in counts) {
        if (counts[note] > winnerCount) {
            winnerCount = counts[note];
            winnerNote = note;
        }
    }

    return {note: winnerNote, count: winnerCount}
}

export function getMostReccurentNoteInList(notes:string[]) {
    return getMostReccurentNoteInRecord(getNoteOccurenceInList(notes))
}
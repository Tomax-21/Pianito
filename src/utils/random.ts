export function random_number(min: number, max: number) : number {
    return Math.round(Math.random() * (max - min) + min);
}


export function get_random_note({
    note_range = ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 
    octave_range = [0, 1, 2, 3, 4, 5, 6, 7, 8],
    enable_diese=false,
    enable_bemol=false,
    alteration_prob = 0.25
}: {
    note_range?: Array<string>;
    octave_range?: Array<number>;
    enable_diese?: boolean
    enable_bemol?:boolean
    alteration_prob?:number
 }={} // sert a dire : l'object entier est optionnel
):string|null {

    let octave:number = octave_range[random_number(0, octave_range.length-1)]

    /**
     * cas particuliers : 
     * sur l'octave 0 : A0 et B0, Bb0 et A#0
     * sur l'octave 8 : que C8
    */
    alteration_prob = Math.max(0, Math.min(alteration_prob, 1))
    let alteration = ""
    if (random_number(1, 1/alteration_prob) === 1) {
        if (enable_bemol && enable_diese) {
            let rdm = random_number(1,2)
            if (rdm === 1) alteration = "#"
            else if (rdm === 2) alteration = "b"
        } else if (enable_bemol && !enable_diese) {
            alteration = "b"
        } else if (!enable_bemol && enable_diese) {
            alteration = "#"
        }
    }
    

    if (octave == 0) {
        if (note_range.includes("A")) {
            if (note_range.includes("B")) {
                let possibilities = ['A', 'B']
                return possibilities[random_number(0,1)]
            } else {
                return `A${alteration === "#" ? "#" : ""}0`
            }
        } else if (note_range.includes("B")) {
            return `B${alteration === "b" ? "b" : ""}0`
        } else {
            return null
        }
    } else if (octave == 8) {
        if (note_range.includes("C")) {
            return 'C8'
        } else {
            return null
        }
    }

    return `${note_range[random_number(0, note_range.length-1)]}${alteration}${octave}`
}

export function get_multiple_random_note({
    note_range = ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 
    octave_range = [0, 1, 2, 3, 4, 5, 6, 7, 8],
    enable_diese=false,
    enable_bemol=false,
    nb_note
}: {
    note_range?: Array<string>;
    octave_range?: Array<number>;
    enable_diese?: boolean
    enable_bemol?:boolean
    nb_note:number
}): Array<string> {

    if (nb_note ===0) return []

    let notes: Array<string> = []

    for (let i = 0; i<nb_note;i++) {
        
        const randomNote = get_random_note({ note_range: note_range, octave_range: octave_range, enable_bemol: enable_bemol, enable_diese: enable_diese })
        
        if (randomNote) {
            notes.push(randomNote)
        }    
    }

    return notes
}
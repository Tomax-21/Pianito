export function random_number(min: number, max: number) : number {
    return Math.round(Math.random() * (max - min) + min);
}


export function get_random_note({
    note_range = ['A', 'B', 'C', 'D', 'E', 'F', 'G'], 
    octave_range = [0, 1, 2, 3, 4, 5, 6, 7, 8]
}: {
    note_range?: Array<string>;
    octave_range?: Array<number>;
 }={} // sert a dire : l'object entier est optionnel
):string|null {

    let octave:number = octave_range[random_number(0, octave_range.length-1)]

    if (octave == 0) {
        if (note_range.includes("A")) {
            if (note_range.includes("B")) {
                let possibilities = ['A', 'B']
                return possibilities[random_number(0,1)]
            } else {
                return "A0"
            }
        } else if (note_range.includes("B")) {
            return "B0"
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

    return `${note_range[random_number(0, note_range.length-1)]}${octave}`
}
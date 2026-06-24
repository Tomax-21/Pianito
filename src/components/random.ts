export function random_number(min: number, max: number) : number {
    return Math.round(Math.random() * (max - min) + min);
}


export function get_random_note(note_range: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G'], octave_range: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8]):string|null {

    let octave:number = octave_range[random_number(0, octave_range.length)]

    if (octave == 0) {
        if (note_range.includes("A")) {
            if (note_range.includes("B")) {
                let possibilities = ['A', 'B']
                return possibilities[random_number(0,1)]
            } else {
                return "A/0"
            }
        } else if (note_range.includes("B")) {
            return "B/0"
        } else {
            return null
        }
    } else if (octave == 8) {
        if (note_range.includes("C")) {
            return 'C/8'
        } else {
            return null
        }
    }

    return `${note_range[random_number(0, note_range.length)]}/${octave}`
}
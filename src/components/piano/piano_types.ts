export enum piano_key_color {
 WHITE = "white",
 BLACK = "black",
}

export type piano_key_type = {
    name? : string,
    color : piano_key_color,
    active?: boolean,
}
export type PianoKeyProps = piano_key_type & {
    onClick?: () => void;
}

export type pianoKeyContainerType = {
    name_white: string,
    has_black?: boolean
    onKeyClicked: (noteName:string) => void;
}

export type pianoOctaveType = {
    octave_number: number
    is_first_octave? : boolean
    is_last_octave?: boolean
    onNoteTriggered: (noteName: string) => void
}

export type PianoProps = {
    onNotePlayed: (noteName: string) => void
}
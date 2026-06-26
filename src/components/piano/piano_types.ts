export enum piano_key_color {
 WHITE = "white",
 BLACK = "black",
}
export enum note_status {
    WRONG = "wrong",
    NEUTRE = "neutre",
    CORRECT = "correct",
}

export type piano_key_type = {
    name? : string,
    color : piano_key_color,
    active?: boolean,
}
export type PianoKeyProps = piano_key_type & {
    target_note?: string|null
    onClick?: () => void;
}

export type pianoKeyContainerType = {
    name_white: string,
    has_black?: boolean
    target_note?: string|null
    onKeyClicked: (noteName:string) => void;
}

export type pianoOctaveType = {
    octave_number: number
    is_first_octave? : boolean
    is_last_octave?: boolean
    target_note?: string|null
    onNoteTriggered: (noteName: string) => void
}

export type PianoProps = {
    target_note?:string|null

    onNotePlayed: (noteName: string) => void
    onHelpRequested: () => void
    onRefreshRequested: () => void
}

export type PianoFrameProps = {
    onHelpButtonClick: () => void
    onRefreshButtonClick: () => void
}
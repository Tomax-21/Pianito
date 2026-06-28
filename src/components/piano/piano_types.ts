export enum piano_key_color {
 WHITE = "white",
 BLACK = "black",
}
export enum note_status {
    WRONG = "wrong",
    NEUTRE = "neutre",
    CORRECT = "correct",
}

export enum keys_name_status {
    SHOW = "show",
    HIDE = "hide",
    SHOWONLYDO = "showonlydo"
}

export type piano_key_type = {
    name? : string,
    color : piano_key_color,
    active?: boolean,
}
export type PianoKeyProps = piano_key_type & {
    target_note?: string|null
    show_keys_name: keys_name_status

    onClick?: () => void;
}

export type pianoKeyContainerType = {
    name_white: string,
    has_black?: boolean
    target_note?: string|null
    show_keys_name: keys_name_status
    onKeyClicked: (noteName:string) => void;
}

export type pianoOctaveType = {
    octave_number: number
    is_first_octave? : boolean
    is_last_octave?: boolean
    target_note?: string|null
    show_keys_name: keys_name_status
    onNoteTriggered: (noteName: string) => void
}

export type PianoProps = {
    target_note?:string|null
    isMicroUsed:boolean

    onNotePlayed: (noteName: string) => void
    onHelpRequested: () => void
    onRefreshRequested: () => void
    onUseAudioPitchRequested: () => void
}

export type PianoFrameProps = {
    isMicroUsed: boolean
    showKeysName: keys_name_status
    showKeyboard: boolean
    onHelpButtonClick: () => void
    onRefreshButtonClick: () => void
    onMicButtonClick: () => void
    onShowKeyNameButtonClick: () => void
    onShowKeyboardButtonClick: () => void
}
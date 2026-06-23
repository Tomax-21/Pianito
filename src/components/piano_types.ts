export enum piano_key_color {
 WHITE = "white",
 BLACK = "black",
}

export type piano_key_type = {
    name : string,
    color : piano_key_color,
    active?: boolean,
}

export type pianoKeyContainerType = {
    name_white: string,
    name_black?: string,
}
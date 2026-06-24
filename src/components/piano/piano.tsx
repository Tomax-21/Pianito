import "../../css/piano.css"
import { SoundPlayer } from "../sound_player"
import { PianoOctave } from "./pianoOctave"

export function Piano() {
    const handlePlayNote = (noteName: string) => {
        SoundPlayer(noteName)
    }
    return (
        <div className="piano">
            <PianoOctave octave_number={0} is_first_octave={true} onNoteTriggered={handlePlayNote}/>
            <PianoOctave octave_number={1} onNoteTriggered={handlePlayNote}/>
            <PianoOctave octave_number={2} onNoteTriggered={handlePlayNote}/>
            <PianoOctave octave_number={3} onNoteTriggered={handlePlayNote}/>
            <PianoOctave octave_number={4} onNoteTriggered={handlePlayNote}/>
            <PianoOctave octave_number={5} onNoteTriggered={handlePlayNote}/>
            <PianoOctave octave_number={6} onNoteTriggered={handlePlayNote}/>
            <PianoOctave octave_number={7} onNoteTriggered={handlePlayNote}/>
            <PianoOctave octave_number={8} is_last_octave={true} onNoteTriggered={handlePlayNote}/>
        </div>
    )
}
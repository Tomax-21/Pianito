import { useState } from "react"
import { SoundPlayer } from "../../components/piano/sound_player"
import { areEnharmonic } from "../../utils/note_comparison"
import { get_random_note } from "../../utils/random"
import { Partition } from "../../components/partition/partition"
import { Piano } from "../../components/piano/piano"
import { note_status } from "../../components/piano/piano_types"

export default function NoteTrainer() {
    
      const [random_note, set_random_note] = useState<string|null>(()=>get_random_note({octave_range:[4, 5]})) //fct fleché permet d'executer que au lancement
      const [showHelp, setShowHelp] = useState<boolean>(false)
      const [noteStatus, setNoteStatus] = useState<note_status>(note_status.NEUTRE)


      const handlePlayedNote = (noteName: string) => {
        SoundPlayer(noteName)
        setShowHelp(false)

        if (!random_note) return
        //console.log("note joué, random note", noteName, random_note)
        if (areEnharmonic(noteName.toUpperCase(), random_note.toUpperCase())) {
          
          setNoteStatus(note_status.CORRECT)
          
          setTimeout(() => {
            let new_note: string|null = ''
            do {
              new_note = get_random_note({octave_range : [4, 5]})
            } while (new_note === random_note || new_note===null)
            
            set_random_note(new_note)

            setNoteStatus(note_status.NEUTRE)
          }, 400)
          
          
        } else {
          setNoteStatus(note_status.WRONG)

          setTimeout(() => {
            setNoteStatus(note_status.NEUTRE)
          }, 400)
        }
      }

      const handleHelpRequested = () => {
        setShowHelp(true)
    }
    
    return (
         <div className="piano-partition-page">
            <div className="top-box">
                <h2>Partition</h2>

                <div className="partition-box">
                    {/**notes_list={["C4", "D4", "Eb4", "F4", "G4", "G#4"]}*/}
                    <Partition 
                      notes_list={random_note !== null ? [random_note] : []}
                      status={noteStatus}
                    />
                </div>
            </div>
            
                
            <Piano 
                onNotePlayed={handlePlayedNote} 
                onHelpRequested={handleHelpRequested}
                target_note={showHelp ? random_note : null}
            />
      </div>
    );
}
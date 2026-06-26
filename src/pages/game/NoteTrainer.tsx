import { useState } from "react"
import { SoundPlayer } from "../../components/piano/sound_player"
import { areEnharmonic } from "../../utils/note_comparison"
import { get_multiple_random_note } from "../../utils/random"
import { Partition } from "../../components/partition/partition"
import { Piano } from "../../components/piano/piano"
import { note_status } from "../../components/piano/piano_types"
import { prepareNotesForTrainer } from "../../utils/note_conversion"


const nb_note = 4

export default function NoteTrainer() {

      const [liste_note, set_liste_note] = useState<Array<Array<string>>>(()=> prepareNotesForTrainer(get_multiple_random_note({nb_note:nb_note,octave_range:[4, 5]}))) //fct fleché permet d'executer que au lancement
      const [currentIndex, setCurrentIndex] = useState<number>(0)

      const [showHelp, setShowHelp] = useState<boolean>(false)


      const handlePlayedNote = (noteName: string) => {
        SoundPlayer(noteName)
        setShowHelp(false)

        if (liste_note.length === 0) return

        const templist = [...liste_note]

        //console.log("note joué, random note", noteName, random_note)
        if (areEnharmonic(noteName.toUpperCase(), liste_note[currentIndex][0].toUpperCase())) {
          
          templist[currentIndex][1] = note_status.CORRECT

          setCurrentIndex(currentIndex+1)

          set_liste_note(templist)
          
          if (currentIndex === liste_note.length-1) {
            setTimeout(() => {
              let new_notes: Array<Array<string>>
              
              new_notes = prepareNotesForTrainer(get_multiple_random_note({nb_note:nb_note,octave_range:[4, 5]}))
              
              set_liste_note(new_notes)
              setCurrentIndex(0)

              //liste_note[currentIndex][1] = note_status.NEUTRE

            }, 400)
          }
          
          
          
        } else {
          templist[currentIndex][1] = note_status.WRONG
          set_liste_note(templist)


          setTimeout(() => {
            //on creer une deuxieme fois car on manipule la meme liste sinon donc ca pose probleme dans l'actualisation ??
            set_liste_note((recent_list => {
              const list_copy = [...recent_list]
              list_copy[currentIndex][1] = note_status.NEUTRE

              return list_copy
            }))
          }, 400)
        }
      }

      const handleHelpRequested = () => {
        setShowHelp(!showHelp)
    }
    
    return (
         <div className="piano-partition-page">
            <div className="top-box">
                <h2>Partition</h2>

                <div className="partition-box">
                    {/**notes_list={[["C4", note_status.NEUTRE], ["D4", note_status.NEUTRE], "Eb4", "F4", "G4", "G#4"]}*/}
                    <Partition 
                      notes_list={liste_note}
                    />
                </div>
            </div>
            
                
            <Piano 
                onNotePlayed={handlePlayedNote} 
                onHelpRequested={handleHelpRequested}
                target_note={showHelp ? liste_note[currentIndex][0] : null}
            />
      </div>
    );
}
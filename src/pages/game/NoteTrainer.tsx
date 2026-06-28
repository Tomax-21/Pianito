import { useState } from "react"
import { SoundPlayer } from "../../components/piano/sound_player"
import { areEnharmonic, capitalize } from "../../utils/note_comparison"
import { get_multiple_random_note } from "../../utils/random"
import { Partition } from "../../components/partition/partition"
import { Piano } from "../../components/piano/piano"
import { note_status } from "../../components/piano/piano_types"
import { prepareNotesForTrainer } from "../../utils/note_conversion"
import { useAudioPitch } from "../../utils/hooks/useAudioPitch"


const nb_note = 6

export default function NoteTrainer() {

      const [useMic, setUseMic] = useState<boolean>(false)

      const [liste_note, set_liste_note] = useState<Array<Array<string>>>(()=> generateNewList()) //fct fleché permet d'executer que au lancement

      const [currentIndex, setCurrentIndex] = useState<number>(0)

      const [showHelp, setShowHelp] = useState<boolean>(false)

      function generateNewList() {
        let new_notes: Array<Array<string>>
        new_notes = prepareNotesForTrainer(get_multiple_random_note({nb_note:nb_note,octave_range:[2,3,4, 5], enable_bemol: true, enable_diese: true}))
        return new_notes    
        
      }

      function resetNotes() {
        const new_notes: Array<Array<string>> = generateNewList()
        set_liste_note(new_notes)
        setCurrentIndex(0)
      }


      const playNote = (noteName: string) => {
        SoundPlayer(noteName)
        handlePlayedNote(noteName)
        setShowHelp(false)

      }
      const handlePlayedNote = (noteName: string) => {

        if (liste_note.length === 0) return

        const templist = [...liste_note]

        console.log("note joué, random note", noteName,  liste_note[currentIndex][0])
        if (areEnharmonic(capitalize(noteName), capitalize(liste_note[currentIndex][0]))) {
          
          templist[currentIndex][1] = note_status.CORRECT

          setCurrentIndex(currentIndex+1)

          set_liste_note(templist)
          
          if (currentIndex === liste_note.length-1) {
            setTimeout(() => {
              resetNotes()

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

              if (list_copy[currentIndex][1] === note_status.WRONG) {
                // on verifie si la bonne touche n'a pas été trouvée entre temps (dans les 400ms de l'animation)
                list_copy[currentIndex][1] = note_status.NEUTRE

              }

              return list_copy
            }))
          }, 400)
        }
      }

      const handleHelpRequested = () => {
        setShowHelp(!showHelp)
    }

    const handleRefreshRequested = () => {
      resetNotes()
    }

    const handleUseAudioPitchRequested = () => {
      setUseMic(!useMic)
    }

    const handleOnMicroDetectNote = (note:string) => {
      console.log(note)
      handlePlayedNote(note)

    }

    useAudioPitch(useMic, handleOnMicroDetectNote)


    
    return (
         <div className="piano-partition-page">
            <div className="top-box">
                <h2>Partition</h2>

                <div className="partition-box">
                    {/**notes_list={[["C4", note_status.NEUTRE], ["D4", note_status.NEUTRE], "Eb4", "F4", "G4", "G#4"]}*/}
                    <Partition 
                      notes_list={liste_note}
                      show_all_staves={true}
                    />
                </div>
            </div>
            
                
            <Piano 
                onNotePlayed={playNote} 
                onHelpRequested={handleHelpRequested}
                onRefreshRequested={handleRefreshRequested}
                onUseAudioPitchRequested={handleUseAudioPitchRequested}
                isMicroUsed={useMic}
                target_note={showHelp ? liste_note[currentIndex][0] : null}
            />
      </div>
    );
}
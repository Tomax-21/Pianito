import { useState } from "react"
import { Partition } from "./components/partition/partition"
import { Piano } from "./components/piano/piano"
import { get_random_note } from "./components/random"
import { SoundPlayer } from "./components/sound_player"
import { vexflowNotetoClassicNote } from "./components/note_conversion"



function App() {

  const [random_note, set_random_note] = useState<string|null>(()=>get_random_note({octave_range:[4]})) //fct fleché permet d'executer que au lancement

  const handlePlayedNote = (noteName: string) => {
    SoundPlayer(noteName)
    if (!random_note) return

    console.log(noteName, random_note)
    if (noteName.toUpperCase() === vexflowNotetoClassicNote(random_note)) {
      let new_note: string|null = ''
      do {
        new_note = get_random_note({octave_range : [4]})
      } while (new_note === random_note || new_note===null)
      
      set_random_note(new_note)
      
    }

  }


  

  return (
    <>
    <div className="piano-partition-page">
      <div className="partition-box">
        <h2>Partition</h2>
        {/**<Partition notes_list={["C4", "D4", "Eb4", "F4", "G4", "G#4"]}/>*/}
        <Partition notes_list={random_note !== null ? [random_note] : []}/>
      </div>
        
        <Piano onNotePlayed={handlePlayedNote}/>
      </div>
    </>
  )
}

export default App

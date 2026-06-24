import { useState } from "react"
import { Partition } from "./components/partition/partition"
import { Piano } from "./components/piano/piano"
import { get_random_note } from "./components/random"
import { SoundPlayer } from "./components/sound_player"



function App() {

  const [random_note, set_random_note] = useState<string|null>(()=>get_random_note({octave_range:[4, 5]})) //fct fleché permet d'executer que au lancement

  const handlePlayedNote = (noteName: string) => {
    SoundPlayer(noteName)
    if (!random_note) return

    console.log("note joué, random note", noteName, random_note)
    if (noteName.toUpperCase() === random_note.toUpperCase()) {
      let new_note: string|null = ''
      do {
        new_note = get_random_note({octave_range : [4, 5]})
      } while (new_note === random_note || new_note===null)
      
      set_random_note(new_note)
      
    }

  }


  

  return (
    <>
    <div className="piano-partition-page">
      <div className="top-box">
        <h2>Partition</h2>

        <div className="partition-box">
        {/**<Partition notes_list={["C4", "D4", "Eb4", "F4", "G4", "G#4"]}/>*/}
        <Partition notes_list={random_note !== null ? [random_note] : []}/>
      </div>
      </div>
      
        
        <Piano onNotePlayed={handlePlayedNote}/>
      </div>
    </>
  )
}

export default App

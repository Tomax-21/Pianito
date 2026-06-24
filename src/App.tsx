import { Partition } from "./components/partition/partition"
import { Piano } from "./components/piano/piano"
import { SoundPlayer } from "./components/sound_player"

function App() {
  const handlePlayedNote = (noteName: string) => {
    SoundPlayer(noteName)
  }

  return (
    <>
    <div className="piano-partition-page">
      <div className="partition-box">
        <h2>Partition</h2>
        <Partition notes_list={["C4", "D4", "Eb4", "F4", "G4", "G#4"]}/>
      </div>
        
        <Piano onNotePlayed={handlePlayedNote}/>
      </div>
    </>
  )
}

export default App

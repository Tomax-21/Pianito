import { Partition } from "./components/partition/partition"
import { Piano } from "./components/piano/piano"

function App() {

  return (
    <>
    <div className="piano-partition-page">
      <div className="partition-box">
        <h2>Partition</h2>
        <Partition notes_list={["C", "D", "Eb", "F", "G", "G#"]}/>
      </div>
        
        <Piano/>
      </div>
    </>
  )
}

export default App

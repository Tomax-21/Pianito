import { Partition } from "./components/partition/partition"
import { Piano } from "./components/piano/piano"

function App() {

  return (
    <>
    <div className="partition-box">
      <h2>Partition</h2>
      <Partition/>
    </div>
      
      <Piano/>
    </>
  )
}

export default App

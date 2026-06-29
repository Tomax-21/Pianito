import { BrowserRouter, Route, Routes } from "react-router-dom"
import NoteTrainer from "./pages/game/NoteTrainer"
import Home from "./pages/Home"
import { init_sound_player_synth } from "./components/piano/sound_player"
import LevelSelectionPage from "./pages/LevelSelection"

function App() {
  
  init_sound_player_synth() // initialisation du son au demarrage

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/level-select" element={<LevelSelectionPage />} />
        <Route path="/learn-notes" element={<NoteTrainer />} />
        <Route path="/learn-notes/:levelId" element={<NoteTrainer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

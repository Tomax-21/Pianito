import { BrowserRouter, Route, Routes } from "react-router-dom"
import NoteTrainer from "./pages/game/NoteTrainer"
import Home from "./pages/Home"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-notes" element={<NoteTrainer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

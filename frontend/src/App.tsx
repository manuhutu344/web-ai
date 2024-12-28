import Navbar from "./components/Navbar"
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"


function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<Navbar />} />
      </Routes>
    </Router>
  )
}

export default App

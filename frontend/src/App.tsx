import Home from "./pages/Home"
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"


function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App

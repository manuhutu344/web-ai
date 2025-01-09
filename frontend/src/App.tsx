import Home from "./pages/Home"
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import { ClerkProvider, SignIn, SignedOut, SignUp, SignedIn } from "@clerk/clerk-react"
import AnalysisPage from "./pages/AnalysisPage"
import Dashboard from "./pages/Dashboard"
import PhotoPage from "./pages/PhotoPage/PhotoPage"

const clerkFrontendApi = import.meta.env.VITE_CLERK_FRONTEND_API

function App() {

  return (
    <Router>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<>
        <SignedIn>
          <Navigate to="/dashboard/analysis" replace/>
        </SignedIn>
        <SignedOut>
          <div className="flex items-center justify-center h-screen">
            <SignIn />
          </div>
        </SignedOut>
        </>} />

          <Route path="/signup" element={
            <div className="flex items-center justify-center h-screen">
                <SignUp />
          </div>} />
          <Route path="dashboard"  element={<Dashboard />}>
            <Route path="analysis" element={<AnalysisPage />} />
            <Route path="photo" element={<PhotoPage />} />
          </Route>
      </Routes>
    </Router>
  )
}

export default App

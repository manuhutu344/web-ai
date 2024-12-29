import HeroSection from "../components/HeroSection"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"

function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <HeroSection />
    </div>
  )
}

export default Home
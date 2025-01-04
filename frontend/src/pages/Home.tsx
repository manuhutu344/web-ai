import HeroSection from "../components/HeroSection"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import CompaniesSection from "../components/CompaniesSection"
import PaymentPlaneSection from "../components/PaymentPlaneSection"
import Foter from "../components/Foter"

function Home() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <HeroSection />
      <CompaniesSection />
      <PaymentPlaneSection />
      <Foter />
    </div>
  )
}

export default Home
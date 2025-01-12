import { useState, useRef, useEffect } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import {FaHome, FaCamera, FaChartLine, FaHistory, FaBars} from "react-icons/fa"
import { useUser } from "@clerk/clerk-react"
import {logo, hair} from "../assets/index"
import style from "../styles/DashboardStyles"

function Dashboard() {
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const {user} = useUser()
  const [showSidebar, setShowSidebar] = useState(false)
  const [showCard, setShowCard] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const toggleSidebar = () => setShowSidebar(!showSidebar)
  const toggleCard = () => setShowCard((prev) => !prev)
  useEffect(()=>{
    const handleClickOutside = (event: MouseEvent) =>{
      if(cardRef.current && !cardRef.current.contains(event.target as Node)) {
        setShowCard(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  const maskeEmail = (email: string) => {
    const [username, domain] = email.split("@")
    const maskedUsername = username.length > 3 ? `${username.slice(0, 3)}**` : username
    const maskedDomain = domain.split(".").map((part, index)=>(index === 0 ? `${part[0]}**` : part)).join('.')
  }
return (
   <div className={style.container}>
      {!isHomePage && (
        <div className={style.mobileToggle}>
          <span className={style.mobileTitle}>Analisis Rambut</span>
          <button onClick={toggleSidebar} className={style.toggleButton}>
              <FaBars className={style.toggleIcon} />
          </button>
        </div>
      )}
      {!isHomePage &&(
        <aside className={`${style.sidebar} ${showSidebar ? "translate-x-0": "-translate-x-full"} md:translate-x-0`}>
         <div className={style.logoContainer}>
          <img src={logo} alt="Logo"  className={style.logoImage}/>
         <span className={style.logoText}>Analisis Rambut</span>
       </div>
       <nav className={style.nav}>
        <Link to={"/dashboard/analysis"} className={`${style.navLink} ${location.pathname === "/dashboard/analysis" ? style.activeLink : ""}`}>
          <FaChartLine className={style.navIcon} />
          <span className={style.navText}>Cantik</span>
        </Link>
        <Link to={"/dashboard/photo"} className={`${style.navLink} ${location.pathname === "/dashboard/photo" ? style.activeLink : ""}`}>
          <FaCamera className={style.navIcon} />
          <span className={style.navText}>Ambil Foto</span>
        </Link>
       </nav>
       </aside>
      )}
   </div>
  )
}

export default Dashboard
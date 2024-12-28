import { useState } from "react"
import {Link, useNavigate} from "react-router-dom"
// import {useAuth} from "@clerk/clerk-react"
import {FaBars, FaTimes} from "react-icons/fa"
import styles from "../styles/NavbarStyles"
import { logo } from "../assets/index"

function Navbar() {
    const navigation = useNavigate()
    // const {isSignedIn} = useAuth()
    const [isMenuOpen, setIsMenuOpen ] = useState(false)
    const [isLogoLoaded, setIsLogoLoaded] = useState(true)
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  return (
  <nav className={styles.navbar}>
    <div className={styles.container}>
        <Link to={"/"} className={styles.logo}>
            {isLogoLoaded ? (<img src={logo} alt="Logo" onError={()=>setIsLogoLoaded(false)} className="w-16 h-16 md:w-20 md:h-20" />) : (
                "Logo"
            )}
        </Link>
    </div>
  </nav>
  )
}

export default Navbar
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa"
import styles from "../styles/FooterStyles"

function Foter() {
  return (
   <footer className={styles.footer}>
    <div className={styles.container}>
        <div className={styles.logo}>
            Logo <span className={styles.logoHighlight}>.</span>
        </div>

        <div className={styles.links}>
            <a href="/privacy" className={styles.link}>Kebijakan Privasi</a>
            <a href="/terms" className={styles.link}>Ketentuan Layanan</a>
            <a href="/contact" className={styles.link}>Kontak</a>
        </div>

        <div className={styles.socialMedia}>
            <a href="#" className={styles.socialLink}><FaFacebook /></a>
            <a href="#" className={styles.socialLink}><FaInstagram /></a>
            <a href="#" className={styles.socialLink}><FaTwitter /></a>
        </div>
    </div>
    <div className={styles.copy}>
        &copy; {new Date().getFullYear()} Candy. All rights reserved.
    </div>
   </footer>
  )
}

export default Foter
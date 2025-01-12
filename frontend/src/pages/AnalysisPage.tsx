import { useNavigate } from "react-router-dom"
import {prof, tube1, tube2, tube4, tube5} from "../assets/index"
import styles from "../styles/AnalysisPageStyles"

function AnalysisPage() {
  const navigate = useNavigate()
  function handleButtonClick(){
    navigate("/dashboard/photo")
  }
  return (
    <div className={styles.container}>
      <div className={styles.backgroundCircles}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
      </div>
      <div className={styles.container}>
          <img src={tube1} alt="Tube 1" className={styles.tube1} />
          <img src={tube2} alt="Tube 2" className={styles.tube2} />
          <img src={tube4} alt="Tube 4" className={styles.tube3} />
          <img src={tube5} alt="Tube 5" className={styles.tube4} />
      </div>
      <img src={prof} alt="Prof" className={styles.scientistImage} />
      <button onClick={handleButtonClick} className={styles.startButton}>
        Mulai Analysis
      </button>
    </div>
  )
}

export default AnalysisPage
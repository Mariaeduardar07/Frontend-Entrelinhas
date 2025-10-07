import styles from "./sobreMim.module.css";
import HeroSectionAbout from "@/components/HeroSectionAbout";
import FeatureCards from "@/components/motivationCard";

export default function Sobre() {
  return  (
    <div className={styles.container}>
         <HeroSectionAbout />
          <FeatureCards />
    </div>
 
  )
}

import styles from "./sobreMim.module.css";
import HeroSectionAbout from "@/components/HeroSectionAbout";
import FeatureCards from "@/components/motivationCard";
import FormContact from "@/components/formContact";

export default function Sobre() {
  return  (
    <div className={styles.container}>
         <HeroSectionAbout />
          <FeatureCards />
          <FormContact />
    </div>
 
  )
}

import styles from "./sobreMim.module.css";
import HeroSectionAbout from "@/components/HeroSectionAbout";
import FeatureCards from "@/components/motivationCard";
import FormContact from "@/components/formContact";
import SocialSection from "@/components/socialSection";

export default function Sobre() {
  return  (
    <div className={styles.container}>
         <HeroSectionAbout />
          <FeatureCards title="PORQUE CRIEI O ENTRELINHAS" />
          <FormContact />
          <SocialSection title="ME ENCONTRE NAS REDES SOCIAIS" />
    </div>
 
  )
}

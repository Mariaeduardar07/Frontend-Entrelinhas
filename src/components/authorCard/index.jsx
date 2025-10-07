import Link from "next/link";
import { BookOpen } from "lucide-react";
import styles from "./author.module.css";

export default function AuthorCard({ autor }) {
  const fallbackImage = "/image/imgBanner.png";
  
  // Processa a imageUrl do backend
  const getImageUrl = (autor) => {
    if (!autor.imageUrl) return fallbackImage;
    
    // Se a imageUrl começa com 'public/', remove essa parte
    if (autor.imageUrl.startsWith('public/')) {
      let url = '/' + autor.imageUrl.substring(7); // Remove 'public/' e adiciona '/'
      
      // Se não tem extensão, adiciona .png
      if (!url.includes('.')) {
        url += '.png';
      }
      
      return url;
    }
    
    // Se já é uma URL completa ou caminho absoluto, usa como está
    return autor.imageUrl;
  };

  return (
    <div className={styles.cardWrapper}>
      <Link href={`/autores/${autor.id}`} className={styles.card}>
        {/* Background Pattern */}
        <div className={styles.cardBackground}>
          <div className={styles.geometricPattern}></div>
          <div className={styles.gradientOverlay}></div>
        </div>

        {/* Main Content Container */}
        <div className={styles.contentContainer}>
          {/* Image Section with Innovative Frame */}
          <div className={styles.imageSection}>
            <div className={styles.imageFrame}>
              <img
                src={getImageUrl(autor)}
                alt={autor.nome}
                className={styles.authorImage}
                onError={(e) => {
                  e.target.src = fallbackImage;
                }}
              />
            </div>
            
            {/* Decorative Elements - REMOVED */}
          </div>

          {/* Text Content with Animation */}
          <div className={styles.textContent}>
            <div className={styles.nameContainer}>
              <h3 className={styles.authorName}>{autor.nome}</h3>
              <div className={styles.nameUnderline}></div>
            </div>
            
            <div className={styles.metadata}>
              <div className={styles.badge}>
                <BookOpen size={14} />
                <span>Explorar</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
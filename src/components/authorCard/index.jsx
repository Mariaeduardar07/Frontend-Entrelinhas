import Link from "next/link";
import styles from "./authorCard.module.css";

export default function AuthorCard({ autor, getImageUrl }) {
  const fallbackImage = "/image/imgBanner.png";

  return (
    <Link href={`/autores/${autor.id}`} className={styles.cardLink}>
      <article className={styles.autorCard}>
        <div className={styles.cardBackground}></div>

        <div className={styles.imageWrapper}>
          <div className={styles.imageFrame}>
            <img
              src={getImageUrl(autor)}
              alt={autor.nome}
              className={styles.autorImage}
              onError={(e) => { e.target.src = fallbackImage; }}
            />
          </div>
        </div>

        <div className={styles.cardContent}>
          <h3 className={styles.autorNome}>{autor.nome}</h3>
          <div className={styles.readMore}>
            <span>Explorar biografia</span>
            <div className={styles.arrow}>→</div>
          </div>
        </div>

        <div className={styles.decorativeElements}>
          <div className={styles.topQuote}>"</div>
          <div className={styles.bottomQuote}>"</div>
        </div>
      </article>
    </Link>
  );
}

import Link from "next/link";
import styles from "./authorCard.module.css";

export default function AuthorCard({ autor, getImageUrl }) {
  const fallbackImage = "/image/imgBanner.png";

  // If consumer doesn't pass getImageUrl, use an internal fallback
  const resolveImageUrl =
    typeof getImageUrl === "function"
      ? getImageUrl
      : (a) => {
          if (!a || !a.imageUrl) return fallbackImage;
          if (a.imageUrl.startsWith("public/")) {
            let url = "/" + a.imageUrl.substring(7);
            if (!url.includes(".")) url += ".png";
            return url;
          }
          return a.imageUrl;
        };

  return (
    <Link href={`/autores/${autor.id}`} className={styles.cardLink}>
      <article className={styles.autorCard}>
        <div className={styles.cardBackground}></div>

        <div className={styles.imageWrapper}>
          <div className={styles.imageFrame}>
            <img
              src={resolveImageUrl(autor)}
              alt={autor.nome}
              className={styles.autorImage}
              onError={(e) => {
                e.target.src = fallbackImage;
              }}
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

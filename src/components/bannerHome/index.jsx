import styles from "./bannerHome.module.css";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Banner({
  title,
  description,
  button,
  image,
  imageAlt,
  href = "/autores"
}) {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttonContainer}>
          <Link href={href} className={styles.button}>
            {button} 
            <ChevronRight size={20} strokeWidth={2.5} />
          </Link>
        </div> 
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={image}
          alt={imageAlt}
          width={700}
          height={500}
          className={styles.image}
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
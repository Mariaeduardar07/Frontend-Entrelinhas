import React from "react";
import Link from "next/link";
import { Users, BookOpen } from "lucide-react";
import styles from "./CTASection.module.css";

export default function CTASection({
  title = "EXPLORE O UNIVERSO LITERÁRIO",
  description = "Descubra biografias fascinantes, explore obras marcantes e conecte-se com o rico patrimônio da literatura brasileira.",
  primaryHref = "/autores",
  primaryLabel = "Conhecer Autores",
  secondaryHref = "/sobre",
  secondaryLabel = "Saiba Mais",
}) {
  return (
    <div>
      <section className={styles.ctaSection}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{title}</h2>
            <p className={styles.ctaDescription}>{description}</p>
            <div className={styles.ctaButtons}>
              <Link href={primaryHref} className={styles.ctaButtonPrimary}>
                <Users size={20} />
                {primaryLabel}
              </Link>
              <Link href={secondaryHref} className={styles.ctaButtonSecondary}>
                <BookOpen size={20} />
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

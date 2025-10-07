import React from "react";
import styles from "./heroSectionAbout.module.css";
import Image from "next/image";

export default function HeroSectionAbout() {
  return (
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Olá, eu sou{" "}
              <span className={styles.highlight}>Maria Eduarda</span>
            </h1>

            <p className={styles.heroDescription}>
              Desenvolvedora apaixonada por tecnologia e literatura. Estudante
              de programação no SENAI, criei o Entrelinhas para valorizar nossos
              autores nacionais e tornar a literatura mais acessível para todos.
            </p>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>2</span>
                <span className={styles.statLabel}>Anos estudando</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>12</span>
                <span className={styles.statLabel}>Autores catalogados</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>51</span>
                <span className={styles.statLabel}>Livros no sistema</span>
              </div>
            </div>
          </div>

          <div className={styles.heroImage}>
            <div className={styles.imageContainer}>
              <Image
                src="/image/duda.png"
                alt="Maria Eduarda"
                width={350}
                height={350}
                className={styles.profileImg}
              />
              <div className={styles.imageGlow}></div>
            </div>
          </div>
        </div>
      </section>
  );
}

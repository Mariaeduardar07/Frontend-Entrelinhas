"use client";

import styles from "./bannerHome.module.css";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BannerHome({
  title,
  description,
  button,
  image,
  imageAlt
}) {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.buttonContainer}>
          <button 
            onClick={() => {
              console.log('Botão clicado! Navegando para:', '/autores');
              try {
                window.location.href = '/autores';
                console.log('Navegação executada com sucesso');
              } catch (error) {
                console.error('Erro na navegação:', error);
                window.location = '/autores';
              }
            }}
            className={styles.button}
            type="button"
          >
            {button} 
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>
        </div> 
      </div>
      <div className={styles.imageContainer}>
        {image && (
          <Image
            src={image}
            alt={imageAlt || "Imagem do banner"}
            width={700}
            height={500}
            className={styles.image}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>
    </section>
  );
}
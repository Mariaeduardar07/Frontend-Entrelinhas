import React from "react";
import styles from "./motivationCard.module.css";

export default function FeatureCards({ 
  title = "PORQUE CRIEI O ENTRELINHAS",
  cards = [
    {
      id: 1,
      text: "Sempre fui apaixonada por livros e percebi que muitas pessoas não conhecem a riqueza da literatura brasileira. Queria criar algo que despertasse essa curiosidade."
    },
    {
      id: 2,
      text: "Nossa literatura tem autores incríveis como Machado de Assis, Clarice Lispector e tantos outros que merecem ser conhecidos e admirados pelas novas gerações."
    },
    {
      id: 3,
      text: "Acredito que a tecnologia pode ser uma ponte para conectar pessoas com conhecimento. O Entrelinhas é minha forma de unir programação com educação literária."
    }
  ]
}) {
  return (
    <section className={styles.motivation}>
      <div className={styles.motivationContent}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        
        <div className={styles.motivationGrid}>
          {cards.map((card) => (
            <div key={card.id} className={styles.motivationCard}>
              <p>{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


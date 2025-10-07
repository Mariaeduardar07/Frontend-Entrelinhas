
import styles from "./objectives.module.css";

export default function Objectives() {
  const objectives = [
    {
      title: "Valorizar a Literatura Brasileira",
      description: "Valorizar a literatura brasileira e dar mais visibilidade aos autores nacionais."
    },
    {
      title: "Facilitar o Acesso",
      description: "Facilitar o acesso a informações sobre livros, personagens e períodos históricos."
    },
    {
      title: "Incentivar a Leitura",
      description: "Incentivar a leitura com recomendações personalizadas e curiosidades literárias."
    },
    {
      title: "Lista de Favoritos",
      description: "Permitir que cada leitor crie sua lista de favoritos para futuras leituras."
    },
    {
      title: "Descoberta Inspiradora",
      description: "Tornar a descoberta da literatura nacional simples, interessante e inspiradora."
    },
    {
      title: "Fortalecer a Cultura Brasileira",
      description: "Contribuir para o fortalecimento da cultura e identidade literária brasileira."
    }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>PORQUE O ENTRELINHAS EXISTE</h2>
        <div className={styles.grid}>
          {objectives.map((objective, index) => (
            <div key={index} className={styles.card}>
              <h3 className={styles.cardTitle}>{objective.title}</h3>
              <p className={styles.description}>{objective.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

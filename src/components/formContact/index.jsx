import React from "react";
import { Mail, User, MessageSquare, Send } from "lucide-react";
import styles from "./formContact.module.css";

export default function FormContact() {
  return (
    <div className={styles.contactSection}>
      <h3 className={styles.formTitle}>Entre em Contato</h3>
      <p className={styles.formSubtitle}>
        Tem alguma dúvida ou sugestão? Adoraria ouvir você!
      </p>

      <form className={styles.form}>
        <div className={styles.inputGroup}>
          <div className={styles.inputField}>
            <label htmlFor="name" className={styles.label}>
              <User size={18} />
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              placeholder="Seu nome"
            />
          </div>

          <div className={styles.inputField}>
            <label htmlFor="email" className={styles.label}>
              <Mail size={18} />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              placeholder="seuemail@exemplo.com"
            />
          </div>
        </div>

        <div className={styles.inputField}>
          <label htmlFor="subject" className={styles.label}>
            <MessageSquare size={18} />
            Assunto
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            className={styles.input}
            placeholder="Sobre o que você quer falar?"
          />
        </div>

        <div className={styles.inputField}>
          <label htmlFor="message" className={styles.label}>
            <MessageSquare size={18} />
            Mensagem
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className={styles.textarea}
            placeholder="Escreva sua mensagem..."
          ></textarea>
        </div>

        <button type="submit" className={styles.submitButton}>
          <Send size={20} />
          Enviar Mensagem
        </button>
      </form>
    </div>
  );
}

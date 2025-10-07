"use client";

import { useState, useEffect, use } from "react";
import { ArrowLeft, Calendar, User, BookOpen, Heart } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import axios from "axios";
import styles from "./detalhesLivro.module.css";

export default function DetalhesLivroPage({ params }) {
  const resolvedParams = use(params);
  const [livro, setLivro] = useState(null);
  const [autor, setAutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorito, setIsFavorito] = useState(false);
  useEffect(() => {
    if (resolvedParams.id) {
      fetchLivroData(resolvedParams.id);
      checkFavoriteStatus(resolvedParams.id);
    }
  }, [resolvedParams.id]);

  const fetchLivroData = async (livroId) => {
    try {
      setLoading(true);
      
      // Buscar livro específico primeiro
      const livroResponse = await axios.get(`http://localhost:5000/book/${livroId}`);
      const livroEncontrado = livroResponse.data;
      
      if (!livroEncontrado) {
        setError("Livro não encontrado");
        return;
      }
      
      // Buscar apenas o autor deste livro
      const autorResponse = await axios.get(`http://localhost:5000/author/${livroEncontrado.authorId}`);
      const autorEncontrado = autorResponse.data;

      // Characters já vem como string do backend

      setLivro(livroEncontrado);
      setAutor(autorEncontrado);
    } catch (error) {
      console.error("Erro ao buscar dados do livro:", error);
      setError("Erro ao carregar informações do livro");
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = (livroId) => {
    if (typeof window !== 'undefined') {
      const livrosFavoritos = JSON.parse(localStorage.getItem('livrosFavoritos') || '[]');
      setIsFavorito(livrosFavoritos.includes(parseInt(livroId)));
    }
  };

  const toggleFavorito = () => {
    if (typeof window !== 'undefined') {
      const livrosFavoritos = JSON.parse(localStorage.getItem('livrosFavoritos') || '[]');
      const livroId = parseInt(resolvedParams.id);
      
      if (isFavorito) {
        const novosFavoritos = livrosFavoritos.filter(id => id !== livroId);
        localStorage.setItem('livrosFavoritos', JSON.stringify(novosFavoritos));
        setIsFavorito(false);
        toast.success("Livro removido dos favoritos!");
      } else {
        const novosFavoritos = [...livrosFavoritos, livroId];
        localStorage.setItem('livrosFavoritos', JSON.stringify(novosFavoritos));
        setIsFavorito(true);
        toast.success("Livro adicionado aos favoritos!");
      }
    }
  };

  const getImageUrl = (item) => {
    if (!item?.imageUrl) return '/image/imgBanner.png';
    
    if (item.imageUrl.startsWith('public/')) {
      return '/' + item.imageUrl.substring(7);
    }
    
    return item.imageUrl;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Carregando detalhes do livro...</p>
        </div>
      </div>
    );
  }

  if (error || !livro) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <BookOpen className={styles.errorIcon} />
          <p>{error || "Livro não encontrado"}</p>
          <Link href="/autores" className={styles.backButton}>
            <ArrowLeft size={20} />
            Voltar aos Autores
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {autor ? (
          <Link href={`/autores/${autor.id}`} className={styles.backButton}>
            <ArrowLeft size={20} />
            Voltar para {autor.nome}
          </Link>
        ) : (
          <Link href="/autores" className={styles.backButton}>
            <ArrowLeft size={20} />
            Voltar aos Autores
          </Link>
        )}

        <div className={styles.bookLayout}>
          {/* Seção principal com imagem e informações principais */}
          <div className={styles.mainSection}>
            <div className={styles.bookImageContainer}>
              <img
                src={getImageUrl(livro)}
                alt={livro.title}
                className={styles.bookImage}
                onError={(e) => {
                  e.target.src = '/image/imgBanner.png';
                }}
              />
              <div className={styles.tapToEnlarge}>
                Tap to enlarge
              </div>
            </div>
            
            <div className={styles.bookInfo}>
              <div className={styles.titleSection}>
                <h1 className={styles.bookTitle}>{livro.title}</h1>
                <div className={styles.authorInfo}>
                  <span className={styles.byText}>by</span>
                  {autor && (
                    <Link href={`/autores/${autor.id}`} className={styles.authorName}>
                      {autor.nome}
                    </Link>
                  )}
                </div>
              </div>

              {livro.summary && (
                <div className={styles.description}>
                  <p>{livro.summary}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar com detalhes técnicos */}
          <div className={styles.sidebar}>
            <div className={styles.detailsCard}>
              {livro.year_publication && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Ano de Publicação</span>
                  <span className={styles.value}>{livro.year_publication}</span>
                </div>
              )}

              {livro.historical_period && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Período Histórico</span>
                  <span className={styles.value}>{livro.historical_period}</span>
                </div>
              )}

              {livro.characters && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Personagens</span>
                  <div className={styles.charactersList}>
                    <span className={styles.characterTag}>{livro.characters}</span>
                  </div>
                </div>
              )}

              {livro.curiosities && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Curiosidades</span>
                  <span className={styles.value}>{livro.curiosities}</span>
                </div>
              )}
              
              <div className={styles.favoriteSection}>
                <button 
                  className={`${styles.favoriteButton} ${isFavorito ? styles.favorited : ''}`}
                  onClick={toggleFavorito}
                  title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                >
                  <Heart size={20} fill={isFavorito ? "currentColor" : "none"} />
                  {isFavorito ? "Nos favoritos" : "Adicionar favorito"}
                </button>
              </div>
            </div>


          </div>
        </div>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
}
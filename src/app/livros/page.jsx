"use client";

import { useState, useEffect, use } from "react";
import { ArrowLeft, Calendar, User, BookOpen, Heart } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./detalhesLivro.module.css";

export default function DetalhesLivroPage({ params }) {
  const resolvedParams = use(params);
  const router = useRouter();
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
      const [livroResponse, autoresResponse] = await Promise.all([
        axios.get("http://localhost:5000/book"),
        axios.get("http://localhost:5000/author")
      ]);

      const livroEncontrado = livroResponse.data.find(l => l.id === parseInt(livroId));
      
      if (!livroEncontrado) {
        setError("Livro não encontrado");
        return;
      }

      // Processar personagens se vier como string
      if (livroEncontrado.characters && typeof livroEncontrado.characters === 'string') {
        try {
          // Tenta fazer parse se for JSON
          livroEncontrado.characters = JSON.parse(livroEncontrado.characters);
        } catch {
          // Se não for JSON, trata como string separada por vírgulas
          livroEncontrado.characters = livroEncontrado.characters
            .split(',')
            .map(char => char.trim())
            .filter(char => char.length > 0);
        }
      }

      // Encontrar o autor do livro
      const autorEncontrado = autoresResponse.data.find(a => a.id === livroEncontrado.authorId);

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
    const livrosFavoritos = JSON.parse(localStorage.getItem('livrosFavoritos') || '[]');
    setIsFavorito(livrosFavoritos.includes(parseInt(livroId)));
  };

  const toggleFavorito = () => {
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

        <div className={styles.detailsCard}>
          <div className={styles.imageSection}>
            <img
              src={livro.image || '/image/imgBanner.png'}
              alt={livro.nome || livro.title}
              className={styles.image}
              onError={(e) => {
                e.target.src = '/image/imgBanner.png';
              }}
            />
          </div>

          <div className={styles.titleSection}>
            <div className={styles.titleWithFavorite}>
              <h1 className={styles.title}>{livro.nome || livro.title}</h1>
              <button 
                className={`${styles.favoriteButton} ${isFavorito ? styles.favorited : ''}`}
                onClick={toggleFavorito}
                title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Heart size={24} fill={isFavorito ? "currentColor" : "none"} />
              </button>
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.detailsGrid}>
              {autor && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Autor</span>
                  <Link href={`/autores/${autor.id}`} className={styles.authorLink}>
                    <User size={18} />
                    {autor.nome}
                  </Link>
                </div>
              )}

              {livro.description && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Descrição</span>
                  <p className={styles.value}>{livro.description}</p>
                </div>
              )}

              {livro.summary && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Resumo</span>
                  <p className={styles.value}>{livro.summary}</p>
                </div>
              )}

              {livro.publicationDate && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Data de Publicação</span>
                  <div className={styles.value}>
                    <Calendar size={18} />
                    {new Date(livro.publicationDate).toLocaleDateString('pt-BR')}
                  </div>
                </div>
              )}

              {livro.year_publication && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Ano de Publicação</span>
                  <div className={styles.value}>
                    <Calendar size={18} />
                    {livro.year_publication}
                  </div>
                </div>
              )}

              {livro.historical_period && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Período Histórico</span>
                  <p className={styles.value}>{livro.historical_period}</p>
                </div>
              )}

              {livro.genre && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Gênero</span>
                  <p className={styles.value}>{livro.genre}</p>
                </div>
              )}

              {livro.pages && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Páginas</span>
                  <div className={styles.value}>
                    <BookOpen size={18} />
                    {livro.pages} páginas
                  </div>
                </div>
              )}

              {livro.isbn && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>ISBN</span>
                  <p className={styles.value}>{livro.isbn}</p>
                </div>
              )}

              {livro.characters && Array.isArray(livro.characters) && livro.characters.length > 0 && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Personagens Principais</span>
                  <div className={styles.charactersList}>
                    {livro.characters.map((character, index) => (
                      <div key={index} className={styles.characterItem}>
                        <User size={16} />
                        <span>{typeof character === 'string' ? character : character.name}</span>
                        {typeof character === 'object' && character.description && (
                          <p className={styles.characterDescription}>
                            {character.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {livro.curiosities && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Curiosidades</span>
                  <p className={styles.value}>{livro.curiosities}</p>
                </div>
              )}
            </div>

            <div className={styles.cardMeta}>
              <div className={styles.badge}>
                <BookOpen size={16} />
                Livro
              </div>
              {(livro.year_publication || livro.publicationDate) && (
                <div className={styles.badge}>
                  <Calendar size={16} />
                  {livro.year_publication || new Date(livro.publicationDate).getFullYear()}
                </div>
              )}
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
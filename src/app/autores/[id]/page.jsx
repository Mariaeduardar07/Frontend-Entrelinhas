"use client";

import { useState, useEffect, use } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Clock, Lightbulb, Heart, ArrowLeft } from "lucide-react"; // Ícones para autores
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookCarrossel from "@/components/bookCarrossel";
import styles from "./detalhes.module.css";

export default function DetalhesAutor({ params }) {
  const resolvedParams = use(params);
  const [autor, setAutor] = useState(null);
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFavorito, setIsFavorito] = useState(false);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const buscarDetalhes = async () => {
      try {
        setLoading(true);
        
        // Busca dados do autor
        const autorResponse = await axios.get(
          `http://localhost:5000/author/${resolvedParams.id}`
        );
        setAutor(autorResponse.data);
        
        // Busca todos os livros
        const livrosResponse = await axios.get("http://localhost:5000/book");
        console.log("✅ TODOS OS LIVROS:", livrosResponse.data);
        
        // Filtra livros do autor atual e remove duplicatas
        const livrosDoAutor = livrosResponse.data
          .filter(livro => livro.authorId === parseInt(resolvedParams.id))
          .filter((livro, index, array) => 
            array.findIndex(l => l.id === livro.id) === index
          );
        console.log("📚 LIVROS DO AUTOR:", livrosDoAutor);
        setLivros(livrosDoAutor);
        
        // Verifica se o autor está nos favoritos
        if (typeof window !== 'undefined') {
          const favoritosIds = JSON.parse(localStorage.getItem('autoresFavoritos') || '[]');
          setIsFavorito(favoritosIds.includes(parseInt(resolvedParams.id)));
          
          // Carrega favoritos de livros
          const livrosFavoritos = JSON.parse(localStorage.getItem('livrosFavoritos') || '[]');
          setFavoritos(livrosFavoritos);
        }
        
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    if (resolvedParams.id) {
      buscarDetalhes();
    }
  }, [resolvedParams.id]);

  // Processa a imageUrl (funciona para autor e livro)
  const getImageUrl = (item) => {
    if (!item.imageUrl) return '/image/imgBanner.png';
    
    // Se a imageUrl começa com 'public/', remove essa parte
    if (item.imageUrl.startsWith('public/')) {
      let url = '/' + item.imageUrl.substring(7); // Remove 'public/' e adiciona '/'
      
      // Se não tem extensão, adiciona .png
      if (!url.includes('.')) {
        url += '.png';
      }
      
      return url;
    }
    
    // Se já é uma URL completa ou caminho absoluto, usa como está
    return item.imageUrl;
  };

  // Alterna favorito do autor
  const toggleFavorito = () => {
    if (typeof window !== 'undefined') {
      const favoritosIds = JSON.parse(localStorage.getItem('autoresFavoritos') || '[]');
      const autorId = parseInt(resolvedParams.id);
      
      if (isFavorito) {
        // Remove dos favoritos
        const novosIds = favoritosIds.filter(id => id !== autorId);
        localStorage.setItem('autoresFavoritos', JSON.stringify(novosIds));
        setIsFavorito(false);
        toast.success("Autor removido dos favoritos!");
      } else {
        // Adiciona aos favoritos
        const novosIds = [...favoritosIds, autorId];
        localStorage.setItem('autoresFavoritos', JSON.stringify(novosIds));
        setIsFavorito(true);
        toast.success("Autor adicionado aos favoritos!");
      }
    }
  };

  // Alterna favorito de livro
  const toggleFavoritoLivro = (livroId) => {
    if (typeof window !== 'undefined') {
      const favoritosIds = JSON.parse(localStorage.getItem('livrosFavoritos') || '[]');
      
      if (favoritos.includes(livroId)) {
        // Remove dos favoritos
        const novosIds = favoritosIds.filter(id => id !== livroId);
        localStorage.setItem('livrosFavoritos', JSON.stringify(novosIds));
        setFavoritos(novosIds);
        toast.success("Livro removido dos favoritos!");
      } else {
        // Adiciona aos favoritos
        const novosIds = [...favoritosIds, livroId];
        localStorage.setItem('livrosFavoritos', JSON.stringify(novosIds));
        setFavoritos(novosIds);
        toast.success("Livro adicionado aos favoritos!");
      }
    }
  };

  // Fallback para imagem padrão
  const fallbackImage = "/image/imgBanner.png";

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <span className={styles.spinner}></span>
          Carregando detalhes...
        </div>
      </div>
    );
  }

  if (!autor) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <span className={styles.errorIcon}>😢</span>
          Autor não encontrado
        </div>
        <Link href="/autores" className={styles.backButton}>
          <ArrowLeft size={20} />
          Voltar para Autores
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href="/autores" className={styles.backButton}>
          <ArrowLeft size={20} />
          Voltar para Autores
        </Link>

        <div className={styles.detailsCard}>
          <div className={styles.imageSection}>
            <img
              src={getImageUrl(autor)}
              alt={autor.nome}
              className={styles.image}
              onError={(e) => {
                e.target.src = fallbackImage;
              }}
            />
          </div>

          <div className={styles.titleSection}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>
                {autor.nome || <span className={styles.value}>Nome não disponível</span>}
              </h1>
              <button 
                onClick={toggleFavorito}
                className={`${styles.favoriteButton} ${isFavorito ? styles.favorited : ''}`}
                title={isFavorito ? "Remover dos favoritos" : "Adicionar aos favoritos"}
              >
                <Heart size={24} fill={isFavorito ? "#e74c3c" : "none"} />
              </button>
            </div>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.cardMeta}>
              <span className={styles.badge}>
                <BookOpen size={12} />
                {livros.length} {livros.length === 1 ? 'livro' : 'livros'}
              </span>
            </div>

            <div className={styles.detailsGrid}>
              {autor.biography && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Biografia:</span>
                  <span className={styles.value}>{autor.biography}</span>
                </div>
              )}

              {autor.historical_period && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Período Histórico:</span>
                  <span className={styles.value}>{autor.historical_period}</span>
                </div>
              )}

              {autor.curiosities && (
                <div className={styles.detailItem}>
                  <span className={styles.label}>Curiosidades:</span>
                  <span className={styles.value}>{autor.curiosities}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Carrossel de Livros */}
        <BookCarrossel 
          books={livros} 
          authorName={autor.nome} 
          favoritos={favoritos}
          toggleFavorito={toggleFavoritoLivro}
        />
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
  );
}
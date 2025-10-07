"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, BookOpen, Calendar, Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import styles from "./bookCarrossel.module.css";

export default function BookCarrossel({ books, authorName, favoritos = [], toggleFavorito }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleBooks, setVisibleBooks] = useState(3);
  const router = useRouter();

  // Ajustar número de livros visíveis baseado no tamanho da tela
  useEffect(() => {
    const updateVisibleBooks = () => {
      if (window.innerWidth < 768) {
        setVisibleBooks(1);
      } else if (window.innerWidth < 1024) {
        setVisibleBooks(2);
      } else {
        setVisibleBooks(3);
      }
    };

    updateVisibleBooks();
    window.addEventListener('resize', updateVisibleBooks);
    return () => window.removeEventListener('resize', updateVisibleBooks);
  }, []);

  // Navegação do carrossel
  const nextSlide = () => {
    if (currentIndex < books.length - visibleBooks) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };



  // Toggle favorito do livro
  const toggleBookFavorite = (bookId, e) => {
    e.stopPropagation();
    e.preventDefault();
    
    // Se tem função de toggle da prop, usa ela
    if (toggleFavorito) {
      toggleFavorito(bookId);
      return;
    }
    
    // Caso contrário, usa a implementação local
    if (typeof window !== 'undefined') {
      const favoriteBooks = JSON.parse(localStorage.getItem('livrosFavoritos') || '[]');
      const isFavorite = favoriteBooks.includes(bookId);
      
      if (isFavorite) {
        const newFavorites = favoriteBooks.filter(id => id !== bookId);
        localStorage.setItem('livrosFavoritos', JSON.stringify(newFavorites));
        toast.success("Livro removido dos favoritos!");
      } else {
        const newFavorites = [...favoriteBooks, bookId];
        localStorage.setItem('livrosFavoritos', JSON.stringify(newFavorites));
        toast.success("Livro adicionado aos favoritos!");
      }
    }
  };

  // Processar URL da imagem
  const getBookImageUrl = (book) => {
    if (!book.imageUrl) return '/image/imgBanner.png';
    
    if (book.imageUrl.startsWith('public/')) {
      let url = '/' + book.imageUrl.substring(7);
      if (!url.includes('.')) {
        url += '.png';
      }
      return url;
    }
    
    return book.imageUrl;
  };

  // Verificar se livro está nos favoritos
  const isBookFavorite = (bookId) => {
    // Se tem favoritos da prop, usa eles
    if (favoritos && favoritos.length >= 0) {
      return favoritos.includes(bookId);
    }
    
    // Caso contrário, verifica no localStorage
    if (typeof window !== 'undefined') {
      const favoriteBooks = JSON.parse(localStorage.getItem('livrosFavoritos') || '[]');
      return favoriteBooks.includes(bookId);
    }
    return false;
  };

  if (!books || books.length === 0) {
    return (
      <div className={styles.noBooks}>
        <BookOpen size={48} />
        <h3>Nenhum livro encontrado</h3>
        <p>Este autor ainda não possui livros cadastrados.</p>
      </div>
    );
  }

  return (
    <div className={styles.carrossel}>
      <div className={styles.header}>
        <BookOpen className={styles.headerIcon} />
        <h2 className={styles.title}>
          Principais Obras de {authorName}
        </h2>
        <p className={styles.subtitle}>
          Explore a produção literária deste grande autor
        </p>
      </div>

      <div className={styles.carrosselContainer}>
        {/* Botão Anterior */}
        <button
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>

        {/* Container dos Livros */}
        <div className={styles.booksContainer}>
          <div 
            className={styles.booksWrapper}
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleBooks)}%)`,
              width: `${(books.length * 100) / visibleBooks}%`
            }}
          >
            {books.map((book) => (
              <Link 
                key={book.id}
                href={`/livros/${book.id}`}
                className={styles.bookCard}
                style={{ width: `${100 / books.length}%` }}
              >
                <div className={styles.bookImageContainer}>
                  <img
                    src={getBookImageUrl(book)}
                    alt={book.title || book.nome}
                    className={styles.bookImage}
                    onError={(e) => {
                      e.target.src = '/image/imgBanner.png';
                    }}
                  />
                  
                  {/* Botão de Favorito */}
                  <button
                    className={`${styles.favoriteButton} ${
                      isBookFavorite(book.id) ? styles.favorited : ''
                    }`}
                    onClick={(e) => toggleBookFavorite(book.id, e)}
                    title={isBookFavorite(book.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  >
                    <Heart size={18} fill={isBookFavorite(book.id) ? "currentColor" : "none"} />
                  </button>
                  
                  {/* Overlay de Hover */}
                  <div className={styles.bookOverlay}>
                    <span className={styles.readMore}>Ver Detalhes</span>
                  </div>
                </div>

                <div className={styles.bookInfo}>
                  <h3 className={styles.bookTitle}>
                    {book.title || book.nome}
                  </h3>
                  
                  {(book.year_publication || book.publicationDate) && (
                    <div className={styles.bookYear}>
                      <Calendar size={14} />
                      <span>
                        {book.year_publication || new Date(book.publicationDate).getFullYear()}
                      </span>
                    </div>
                  )}
                  
                  {book.summary && (
                    <p className={styles.bookSummary}>
                      {book.summary.length > 100 
                        ? `${book.summary.substring(0, 100)}...` 
                        : book.summary
                      }
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Botão Próximo */}
        <button
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextSlide}
          disabled={currentIndex >= books.length - visibleBooks}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Indicadores */}
      <div className={styles.indicators}>
        {Array.from({ length: Math.max(1, books.length - visibleBooks + 1) }).map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${
              index === currentIndex ? styles.active : ''
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { Trash2, BookOpen, User } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./favoritos.module.css";
import Banner from "@/components/banner";

export default function FavoritosPage() {
  const [favoritosAutores, setFavoritosAutores] = useState([]);
  const [favoritosLivros, setFavoritosLivros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("autores"); // 'autores' ou 'livros'

  // Carrega favoritos do localStorage
  useEffect(() => {
    carregarFavoritos();
  }, []);

  const carregarFavoritos = async () => {
    try {
      setLoading(true);

      // Pega IDs dos favoritos do localStorage
      const autoresFavoritosIds = JSON.parse(
        localStorage.getItem("autoresFavoritos") || "[]"
      );
      const livrosFavoritosIds = JSON.parse(
        localStorage.getItem("livrosFavoritos") || "[]"
      );

      // Busca dados dos autores favoritos
      if (autoresFavoritosIds.length > 0) {
        const autoresResponse = await axios.get("http://localhost:5000/author");
        const autoresFavoritos = autoresResponse.data.filter((autor) =>
          autoresFavoritosIds.includes(autor.id)
        );
        setFavoritosAutores(autoresFavoritos);
      }

      // Busca dados dos livros favoritos
      if (livrosFavoritosIds.length > 0) {
        const livrosResponse = await axios.get("http://localhost:5000/book");
        const livrosFavoritos = livrosResponse.data.filter((livro) =>
          livrosFavoritosIds.includes(livro.id)
        );
        setFavoritosLivros(livrosFavoritos);
      }
    } catch (error) {
      console.error("Erro ao carregar favoritos:", error);
      toast.error("Erro ao carregar favoritos");
    } finally {
      setLoading(false);
    }
  };

  // Remove autor dos favoritos
  const removerAutorFavorito = (autorId) => {
    const autoresFavoritosIds = JSON.parse(
      localStorage.getItem("autoresFavoritos") || "[]"
    );
    const novosIds = autoresFavoritosIds.filter((id) => id !== autorId);
    localStorage.setItem("autoresFavoritos", JSON.stringify(novosIds));

    setFavoritosAutores((prev) => prev.filter((autor) => autor.id !== autorId));
    toast.success("Autor removido dos favoritos!");
  };

  // Remove livro dos favoritos
  const removerLivroFavorito = (livroId) => {
    const livrosFavoritosIds = JSON.parse(
      localStorage.getItem("livrosFavoritos") || "[]"
    );
    const novosIds = livrosFavoritosIds.filter((id) => id !== livroId);
    localStorage.setItem("livrosFavoritos", JSON.stringify(novosIds));

    setFavoritosLivros((prev) => prev.filter((livro) => livro.id !== livroId));
    toast.success("Livro removido dos favoritos!");
  };

  // Processa a imageUrl
  const getImageUrl = (item) => {
    if (!item.imageUrl) return "/image/imgBanner.png";

    if (item.imageUrl.startsWith("public/")) {
      let url = "/" + item.imageUrl.substring(7);

      // Se não tem extensão, adiciona .png
      if (!url.includes(".")) {
        url += ".png";
      }

      return url;
    }

    return item.imageUrl;
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Carregando seus favoritos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Banner
        title="Meus Favoritos"
        subtitle="Seus autores e livros salvos para fácil acesso"
      />

      {/* Tabs para alternar entre autores e livros */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${
            activeTab === "autores" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("autores")}
        >
          <User size={18} />
          Autores ({favoritosAutores.length})
        </button>
        <button
          className={`${styles.tab} ${
            activeTab === "livros" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("livros")}
        >
          <BookOpen size={18} />
          Livros ({favoritosLivros.length})
        </button>
      </div>

      {/* Conteúdo dos autores favoritos */}
      {activeTab === "autores" && (
        <div className={styles.content}>
          {favoritosAutores.length === 0 ? (
            <div className={styles.empty}>
              <User className={styles.emptyIcon} />
              <h3>Nenhum autor favorito</h3>
              <p>Adicione autores aos favoritos para vê-los aqui</p>
              <Link href="/autores" className={styles.exploreButton}>
                Explorar Autores
              </Link>
            </div>
          ) : (
            <div className={styles.grid}>
              {favoritosAutores.map((autor) => (
                <div key={autor.id} className={styles.card}>
                  <button
                    className={styles.removeButton}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removerAutorFavorito(autor.id);
                    }}
                    title="Remover dos favoritos"
                  >
                    <Trash2 size={16} />
                  </button>

                  <Link
                    href={`/autores/${autor.id}`}
                    className={styles.cardLink}
                  >
                    <div className={styles.imageWrapper}>
                      <img
                        src={getImageUrl(autor)}
                        alt={autor.nome}
                        className={styles.image}
                        onError={(e) => {
                          e.target.src = "/image/imgBanner.png";
                        }}
                      />
                    </div>

                    <div className={styles.cardContent}>
                      <h3 className={styles.itemName}>{autor.nome}</h3>
                      <p className={styles.itemType}>Autor</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Conteúdo dos livros favoritos */}
      {activeTab === "livros" && (
        <div className={styles.content}>
          {favoritosLivros.length === 0 ? (
            <div className={styles.empty}>
              <BookOpen className={styles.emptyIcon} />
              <h3>Nenhum livro favorito</h3>
              <p>Adicione livros aos favoritos para vê-los aqui</p>
              <Link href="/autores" className={styles.exploreButton}>
                Explorar Autores
              </Link>
            </div>
          ) : (
            <div className={styles.grid}>
              {favoritosLivros.map((livro) => (
                <div key={livro.id} className={styles.card}>
                  <button
                    className={styles.removeButton}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      removerLivroFavorito(livro.id);
                    }}
                    title="Remover dos favoritos"
                  >
                    <Trash2 size={16} />
                  </button>

                  <Link
                    href={`/livros/${livro.id}`}
                    className={styles.cardLink}
                  >
                    <div className={styles.imageWrapper}>
                      <img
                        src={getImageUrl(livro)}
                        alt={livro.nome || livro.title}
                        className={styles.image}
                        onError={(e) => {
                          e.target.src = "/image/imgBanner.png";
                        }}
                      />
                    </div>

                    <div className={styles.cardContent}>
                      <h3 className={styles.itemName}>
                        {livro.nome || livro.title}
                      </h3>
                      <p className={styles.itemType}>Livro</p>
                      {livro.publicationDate && (
                        <p className={styles.itemDate}>
                          {new Date(livro.publicationDate).getFullYear()}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

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

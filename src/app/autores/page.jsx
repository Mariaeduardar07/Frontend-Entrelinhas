"use client";

import { useState, useEffect } from "react";
import { Spin } from "antd";
import { Search, Filter, Calendar, Users } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./autores.module.css";
import AuthorCard from "@/components/authorCard";
import Banner from "@/components/banner";

export default function AutoresPage() {
  const [autores, setAutores] = useState([]);
  const [filteredAutores, setFilteredAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");


  const fetchAutores = async () => {
    try {
      const response = await axios.get("http://localhost:5000/author");
      setAutores(response.data);
      setFilteredAutores(response.data);
      toast.success("Autores carregados!");
    } catch (error) {
      console.error("Erro ao carregar autores:", error);
      toast.error("Erro ao carregar autores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutores();
  }, []);

  // Função de filtro
  useEffect(() => {
    let result = [...autores];

    // Filtro por pesquisa
    if (searchTerm) {
      result = result.filter(
        (autor) =>
          autor.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (autor.biography &&
            autor.biography.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro por período histórico
    if (selectedPeriod) {
      result = result.filter(
        (autor) =>
          autor.historical_period &&
          autor.historical_period.includes(selectedPeriod)
      );
    }

    setFilteredAutores(result);
  }, [autores, searchTerm, selectedPeriod]);

  // Obter períodos únicos
  const getUniquePeriods = () => {
    const periods = autores
      .map((autor) => autor.historical_period)
      .filter((period) => period)
      .filter((period, index, arr) => arr.indexOf(period) === index);
    return periods;
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedPeriod("");

  };

  // Processa a imageUrl do backend
  const getImageUrl = (autor) => {
    if (!autor.imageUrl) return "/image/imgBanner.png";

    // Se a imageUrl começa com 'public/', remove essa parte
    if (autor.imageUrl.startsWith("public/")) {
      let url = "/" + autor.imageUrl.substring(7); // Remove 'public/' e adiciona '/'

      // Se não tem extensão, adiciona .png
      if (!url.includes(".")) {
        url += ".png";
      }

      return url;
    }

    // Se já é uma URL completa ou caminho absoluto, usa como está
    return autor.imageUrl;
  };

  return (
    <div className={styles.container}>
      <Banner
        title="Descubra o Mundo dos Autores"
        subtitle="Explore nossa coleção completa de autores com informações detalhadas, biografias e curiosidades sobre cada escritor."
      />
      {loading ? (
        <div className={styles.loadingWrapper}>
          <Spin size="large" />
          <p className={styles.loadingText}>Carregando autores...</p>
        </div>
      ) : (
        <>
          {/* Controles de Filtro e Pesquisa */}
          <div className={styles.controlsWrapper}>
            <div className={styles.filtersContainer}>
              {/* Barra de Pesquisa */}
              <div className={styles.searchContainer}>
                <Search className={styles.searchIcon} size={20} />
                <input
                  type="text"
                  placeholder="Pesquisar autores..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              {/* Filtros */}
              <div className={styles.filtersRow}>


                {/* Filtro por Período */}
                <div className={styles.filterGroup}>
                  <Calendar className={styles.filterIcon} size={16} />
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className={styles.filterSelect}
                  >
                    <option value="">Todos os Períodos</option>
                    {getUniquePeriods().map((period, index) => (
                      <option key={index} value={period}>
                        {period}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Botão Limpar Filtros */}
                <button
                  onClick={handleClearFilters}
                  className={styles.clearButton}
                >
                  Limpar Filtros
                </button>
              </div>

              {/* Contador de Resultados */}
              <div className={styles.resultsCount}>
                <Users size={16} />
                <span>{filteredAutores.length} autores encontrados</span>
              </div>
            </div>
          </div>

          <div className={styles.cardsContainer}>
            {filteredAutores.length > 0 ? (
              filteredAutores.map((autor) => (
                <AuthorCard
                  key={autor.id}
                  autor={autor}
                  getImageUrl={getImageUrl}
                />
              ))
            ) : (
              <div className={styles.noResults}>
                <Users size={48} />
                <h3>Nenhum autor encontrado</h3>
                <p>Tente ajustar os filtros ou pesquisar por outros termos.</p>
              </div>
            )}
          </div>
        </>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        enableMultiContainer={false}
        containerId="autores-toast"
        toastClassName="custom-toast"
        limit={3}
        style={{ zIndex: 9999 }}
        preventDuplicates={true}
        /* use default transition */
      />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import axios from "axios";
import AuthorCard from "../authorCard/";
import styles from "./authorCarousel.module.css";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function authorCarousel() {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Buscar autores da API
  useEffect(() => {
    const fetchAutores = async () => {
      try {
        const response = await axios.get("http://localhost:5000/author");
        setAutores(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar autores:", error);
        setError("Erro ao carregar autores");
      } finally {
        setLoading(false);
      }
    };

    fetchAutores();
  }, []);

  if (loading) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>EXPLORE OS AUTORES</h2>
          <div className={styles.loading}>Carregando...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>EXPLORE OS AUTORES</h2>
          <div className={styles.error}>{error}</div>
        </div>
      </section>
    );
  }

  // Empty state: no authors returned from API
  if (!loading && autores.length === 0) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.title}>EXPLORE OS AUTORES</h2>
          <div className={styles.empty}>Nenhum autor encontrado</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>EXPLORE OS AUTORES</h2>
          <p className={styles.subtitle}>
            Descubra biografias fascinantes e obras marcantes dos grandes escritores
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={5}
          slidesPerView={1}
          slidesPerGroup={1}
          navigation={true}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          centeredSlides={false}
          autoplay={false}
          loop={false}
          watchSlidesProgress={true}
          breakpoints={{
            // Mobile: 1 item por página
            320: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 5
            },
            // Tablet: 2 itens por página
            769: {
              slidesPerView: 2,
              slidesPerGroup: 2,
              spaceBetween: 5
            },
            // Desktop: 3 itens por página
            1025: {
              slidesPerView: 3,
              slidesPerGroup: 3,
              spaceBetween: 5
            }
          }}
          className={styles.swiperContainer}
        >
          {autores.map((autor) => (
            <SwiperSlide key={autor.id} className={styles.swiperSlide}>
              <AuthorCard autor={autor} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
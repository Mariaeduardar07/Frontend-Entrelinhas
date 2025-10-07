"use client";

import { useState, useEffect } from "react";
import { BookOpen, Users, Heart } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";
import Banner from "@/components/bannerHome";
import Objectives from "@/components/objectives";
import AuthorCarousel from "@/components/authorCarousel";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <div className={styles.container}>
      <Banner
        title="Bem-vindo ao Entrelinhas"
        description="Uma plataforma dedicada à valorização de autores e suas obras literárias. Aqui você pode explorar biografias, descobrir curiosidades fascinantes e mergulhar no universo dos grandes escritores da história."
        button="EXPLORAR AGORA"
        image="/image/imgBanner.png"
        imageAlt="Livro aberto"
      />

      <Objectives />
      <AuthorCarousel />

    </div>
  );
}

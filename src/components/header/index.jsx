"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import styles from "./header.module.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Fecha o menu quando a rota muda
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Previne scroll do body quando menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Image
            src="/image/logo.png"
            alt="Logo EntreLinhas"
            width={56}
            height={56}
            className={styles.logoImg}
            priority
          />
          <h1 className={styles.title}>EntreLinhas</h1>
        </div>
        
        {/* Navegação Desktop */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>
                Home
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/autores" className={`${styles.navLink} ${pathname.startsWith('/autores') ? styles.active : ''}`}>
                Autores
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/sobreMim" className={`${styles.navLink} ${pathname === '/sobre' ? styles.active : ''}`}>
                Sobre Mim
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/favoritos" className={`${styles.navLink} ${pathname === '/favoritos' ? styles.active : ''}`}>
                Favoritos
              </Link>
            </li>
          </ul>
        </nav>

        {/* Botão Hambúrguer */}
        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu Mobile */}
        <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
          <div className={styles.mobileNavHeader}>
            <h2 className={styles.mobileNavTitle}>Menu</h2>
          </div>
          
          <ul className={styles.mobileNavList}>
            <li className={styles.mobileNavItem}>
              <Link 
                href="/" 
                className={`${styles.mobileNavLink} ${pathname === '/' ? styles.active : ''}`}
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link 
                href="/autores" 
                className={`${styles.mobileNavLink} ${pathname.startsWith('/autores') ? styles.active : ''}`}
                onClick={closeMenu}
              >
                Autores
              </Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link 
                href="/sobreMim" 
                className={`${styles.mobileNavLink} ${pathname === '/sobreMim' ? styles.active : ''}`}
                onClick={closeMenu}
              >
                Sobre Mim
              </Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link 
                href="/favoritos" 
                className={`${styles.mobileNavLink} ${pathname === '/favoritos' ? styles.active : ''}`}
                onClick={closeMenu}
              >
                Favoritos
              </Link>
            </li>
          </ul>
        </nav>

        {/* Overlay */}
        {isMenuOpen && (
          <div 
            className={`${styles.overlay} ${isMenuOpen ? styles.overlayVisible : ''}`}
            onClick={closeMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  );
}
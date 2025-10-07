import React from 'react'
import styles from './banner.module.css'

export default function Banner({ title, subtitle }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  )
}

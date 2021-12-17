import Link from "next/link"
import styles from "./layout.module.css"
import Image from "next/image"

export default function Layout({ children }) {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/">
            <a className={styles.navbarLink}>Главная</a>
          </Link>

          <Link href="/menu">
            <a className={styles.navbarLink}>Меню</a>
          </Link>

          <Link href="/">
            <a className={styles.navbarLink}>Контакты</a>
          </Link>
          
          <Link href="/">
            <a className={styles.navbarLink}>О нас</a>
          </Link>

          <div className={styles.navbarImages}>
            <div className={styles.navbarImage}>
              <Image 
                priority
                src="/images/shopping-cart-icon.png"
                className={styles.borderCircle}
                height={30}
                width={30}
                alt="login"
              />
            </div>

            <div className={styles.navbarImage}>
              <Image 
                priority
                src="/images/login-icon.png"
                className={styles.borderCircle}
                height={30}
                width={30}
                alt="login"
              />
            </div>
          </div>
        </nav>
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
          {/* <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <span className={styles.logo}>
              <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
            </span>
          </a> */}
        </footer>
    </>
  )
}
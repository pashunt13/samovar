import Link from 'next/link';
import styles from 'styles/layout.module.css';

interface LayoutProps {
  children: object;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link href="/">
              <a className={styles.navbarLink}>Главная</a>
            </Link>

            <Link href="/menu">
              <a className={styles.navbarLink}>Меню</a>
            </Link>

            <Link href="/shoppingCart">
              <a className={styles.navbarLink}>Корзина</a>
            </Link>
          </nav>
        </header>
        <main>{children}</main>
        <footer className={styles.footer}>©Кафе Самовар 2022</footer>
      </div>
    </>
  );
}

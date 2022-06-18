import styles from 'styles/admin.module.css';
import { useState } from 'react';
import { HEADERS } from 'src/consts';
import Head from 'next/head';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(true);

  const handleLogin = async () => {
    try {
      console.log(login + '  ' + password);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ login, password }),
      });

      //использовать useRouter() для redirect: '/admin'
      if (response.status === 200) return (window.location.href = '/admin');
      return alert('Неверный логин или пароль');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Вход</title>
        <meta name="description" content={`Вход`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.modalActive}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.title}>Войдите, {'\n'}чтобы продолжить</div>
          <div className={styles.grid}>
            <div className={styles.subTitle}>Логин:</div>
            <input
              className={styles.input}
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </div>
          <div className={styles.grid}>
            <div className={styles.subTitle}>Пароль:</div>
            <input
              className={styles.input}
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.grid}>
            <button className={styles.confirm} onClick={handleLogin}>
              Войти
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

import styles from 'styles/admin.module.css';
import { useState } from 'react';
import { HEADERS } from 'src/consts';
import Head from 'next/head';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = async () => {
    if (!isChecked)
      return alert('Нужно ваше согласие на сохранение ваших данных');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ login, password }),
      });

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

      <div className={styles.auth}>
        <div className={styles.content}>
          <div className={styles.title}>Войдите, чтобы продолжить</div>
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
            <div className={styles.agreement}>
              <input
                type="checkbox"
                id="agreement"
                onClick={() => setIsChecked(!isChecked)}
              />
              <label htmlFor="agreement">Сохранить мои данные</label>
            </div>
            <button className={styles.login} onClick={handleLogin}>
              Войти
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

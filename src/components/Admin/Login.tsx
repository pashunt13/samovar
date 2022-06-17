import styles from 'styles/admin.module.css';
import { useState } from 'react';
import { HEADERS } from 'src/consts';

interface LoginProps {
  setIsLogged: Function;
}

const Login = ({ setIsLogged }: LoginProps) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [active, setActive] = useState(true);

  const toLogIn = async () => {
    try {
      console.log(login + '  ' + password);
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ login, password }),
      });
      const data = await response.json();
      console.log(data);
      if (data) return setIsLogged(data);
      return alert('Неверный логин или пароль');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={active ? styles.modalActive : styles.modal}
      // onClick={() => setActive(false)}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
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
          <button className={styles.confirm} onClick={toLogIn}>
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

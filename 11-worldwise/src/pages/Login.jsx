import { useEffect, useState } from 'react';
import styles from './Login.module.css';
import PageNav from '@src/components/PageNav';
import { useAuth } from '@src/contexts/FakeAuthContext';
import { useNavigate } from 'react-router-dom';
import Button from '@src/components/Button';

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState('tuando@example.com');
  const [password, setPassword] = useState('HighSecurityPassword');

  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
  }

  useEffect(
    function () {
      if (isAuthenticated === true) {
        navigate('/app', { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleLogin}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}

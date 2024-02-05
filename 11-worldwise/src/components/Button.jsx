import styles from './Button.module.css';

function Button({ children, type, onClick }) {
  return (
    <div className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </div>
  );
}

export default Button;

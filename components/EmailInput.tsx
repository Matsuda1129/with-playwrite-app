import React from 'react';
import styles from './EmailInput.module.css';

interface EmailInputProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ name, value, onChange }) => {
  return (
    <div className={styles.container}>
      <label htmlFor="email" className={styles.label}>メールアドレス:</label>
      <input
        type="email"
        id={name}
        name={name}
        className={styles.input}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default EmailInput;

import React from 'react';
import styles from './NicknameInput.module.css';

interface NicknameInputProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NicknameInput: React.FC<NicknameInputProps> = ({ name, value, onChange }) => {
  return (
    <div className={styles.container}>
      <label htmlFor="nickname" className={styles.label}>ニックネーム:</label>
      <input
        type="text"
        id={name}
        name={name}
        className={styles.input}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default NicknameInput;

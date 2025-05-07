import React from 'react';
import styles from './NameInput.module.css';

interface NameInputProps {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NameInput: React.FC<NameInputProps> = ({ name, value, onChange }) => {
  return (
    <div className={styles.container}>
      <label htmlFor="name" className={styles.label}>名前:</label>
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

export default NameInput;

"use client";

import Link from "next/link";
import styles from "../styles/Home.module.css";
import NameInput from "../components/NameInput";
import NicknameInput from "../components/NicknameInput";
import EmailInput from "../components/EmailInput";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function Page() {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const [nameError, setNameError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!name) {
      setNameError("名前は必須項目です。");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!nickname) {
      setNicknameError("ニックネームは必須項目です。");
      isValid = false;
    } else {
      setNicknameError("");
    }

    if (!email) {
      setEmailError("メールアドレスは必須項目です。");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("メールアドレスの形式が正しくありません。");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!isValid) {
      return;
    }

    const formData = {
      name,
      nickname,
      email,
    };

    console.log(formData);
    router.push('/success');
  };

  return (
    <main className={styles.main}>
      <h1>プロフィールフォーム</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <NameInput name="name" value={name} onChange={(e) => setName(e.target.value)} />
          {nameError && <div style={{ color: "red" }}>{nameError}</div>}
        </div>
        <div>
          <NicknameInput name="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} />
          {nicknameError && <div style={{ color: "red" }}>{nicknameError}</div>}
        </div>
        <div>
          <EmailInput name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <div style={{ color: "red" }}>{emailError}</div>}
        </div>
        <button type="submit">送信</button>
      </form>
    </main>
  );
}

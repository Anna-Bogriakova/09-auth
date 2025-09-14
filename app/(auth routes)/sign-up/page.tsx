'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css"
import { register } from "@/lib/api/clientApi";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ email, password });
      router.push("/profile");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" className={css.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" className={css.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>Register</button>
        </div>
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}

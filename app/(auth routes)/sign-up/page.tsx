'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./SignUpPage.module.css"
import { register } from "@/lib/api/clientApi";
import { ApiError } from "@/app/api/api";
import { useAuthStore } from "@/lib/store/authStore";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser)

  const handleSubmit = async (e: React.FormEvent) => {
    
    
    e.preventDefault();
    try {
      const res = await register({ email, password });
            if (res) {
        setUser(res)
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data?.error ??
          (error as ApiError).message ??
          'Oops... some error'
      )
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

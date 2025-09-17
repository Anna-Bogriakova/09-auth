"use client";

import AuthNavigation from "../AuthNavigation/AuthNavigation";
import css from "./Header.module.css";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/authStore"; // ваш глобальний стан

const Header = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>

          <AuthNavigation user={user} />
        </ul>
      </nav>
    </header>
  );
};

export default Header;

// app/(auth routes)/layout.tsx
"use client"; // ✅ зробили клієнтським компонентом

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ потрібен для router.refresh()

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    router.refresh(); // ✅ оновлюємо роутер при монтуванні
  }, [router]);

  return (
    <div>
      {children} {/* Тут будуть рендеритися сторінки sign-in і sign-up */}
    </div>
  );
}

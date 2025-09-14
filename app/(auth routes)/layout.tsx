// app/(auth routes)/layout.tsx
import React, { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      {children} {/* Тут будуть рендеритися сторінки sign-in і sign-up */}
    </div>
  );
}

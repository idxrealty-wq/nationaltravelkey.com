"use client";

// ============================================
// NTK Client Providers Wrapper
// Path: src/components/auth/ClientProviders.tsx
// Status: LOCKED | Last Updated: 2026-04-09
// ============================================

import { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";

export default function ClientProviders({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

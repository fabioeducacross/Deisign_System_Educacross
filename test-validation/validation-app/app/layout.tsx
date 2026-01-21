import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Validação Design System v0.2.0",
  description: "Teste de validação do pacote @fabioeducacross/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

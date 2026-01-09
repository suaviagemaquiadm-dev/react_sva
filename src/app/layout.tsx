import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sua Viagem Aqui',
  description: 'Plataforma de intermediação para viagens.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header className="bg-white shadow">
          <nav className="container mx-auto p-4 flex justify-between items-center">
            <Link href="/">
              <img src="/logo.svg" alt="Logo Sua Viagem Aqui" className="h-10" />
            </Link>
            <div>
              <Link href="/login" className="text-blue-600 hover:text-blue-800 mr-4">
                Entrar
              </Link>
              <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Cadastre-se
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="bg-gray-800 text-white text-center py-4">
          <p>&copy; {new Date().getFullYear()} Sua Viagem Aqui. Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}

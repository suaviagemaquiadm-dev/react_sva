'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  // Monitora login do usuário
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ destination, checkIn, checkOut });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600">Sua Viagem Aqui</Link>
          <div className="flex gap-4">
            {user ? (
              <span className="text-gray-700">Olá, {user.email}</span>
            ) : (
              <>
                <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Cadastre-se</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Encontre sua próxima estadia</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">
            Conectamos viajantes e anunciantes com inteligência. Receba ofertas personalizadas com nossos chatbots Victor e Sophia.
          </p>
        </div>
      </section>

      {/* Search Box */}
      <section className="container mx-auto px-4 -mt-8 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Destino</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Para onde você vai?"
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Check-out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Hóspedes</label>
              <button
                type="button"
                className="w-full mt-1 border border-gray-300 rounded-md px-3 py-2 text-left focus:ring-blue-500 focus:border-blue-500"
              >
                2 adultos · 0 crianças · 1 quarto
              </button>
            </div>
            <div className="md:col-span-4 pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 font-semibold"
              >
                Pesquisar
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Chatbots & Lead Selector */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Chatbots */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Assistência Inteligente</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="font-bold text-green-800">V</span>
                </div>
                <div>
                  <h3 className="font-semibold">Victor – Vendas</h3>
                  <p className="text-gray-600">Ajuda a encontrar as melhores ofertas para seu perfil.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center">
                  <span className="font-bold text-purple-800">S</span>
                </div>
                <div>
                  <h3 className="font-semibold">Sophia – Turismóloga</h3>
                  <p className="text-gray-600">Dicas locais, experiências e roteiros personalizados.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Selector */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Selecione Leads Quentes</h2>
            <p className="mb-4">Escolha um interesse para ver leads compatíveis:</p>
            <div className="flex flex-wrap gap-2">
              {['praia', 'gastronomia', 'montanhas', 'cultura', 'city tour', 'shopping'].map((interest) => (
                <button
                  key={interest}
                  onClick={() => alert(`Lead selecionado com interesse em: ${interest}`)}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200"
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2026 Sua Viagem Aqui — Plataforma de Intermediação para Viagens</p>
        </div>
      </footer>
    </div>
  );
}

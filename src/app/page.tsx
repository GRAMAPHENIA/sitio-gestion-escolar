"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

// Hooks
import { useAuthSessionListener } from "@/hooks/useAuthSessionListener";

// Componentes principales
import Header from "@/components/Header/Header";
import HeroSection from "@/components/HeroSection/HeroSection";
import Management from "@/components/Management/Management";
import FeaturesGrid from "@/components/Features/FeaturesGrid";

// Iconos y Tipografías
import { BiSend } from "react-icons/bi";
import { Merriweather, Fira_Code } from "next/font/google";

// Tipografías personalizadas
const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const firacode = Fira_Code({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  style: ["normal"],
  display: "swap",
});

const Home: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Escucha el estado de sesión y actualiza el usuario
  useAuthSessionListener(setUser);

  // Redirige al usuario autenticado al dashboard
  const redirectToDashboard = () => router.push("/tablero");

  // Hace scroll suave hasta el formulario de contacto
  const scrollToContactForm = () => {
    const formSection = document.getElementById("contact-form");
    formSection?.scrollIntoView({ behavior: "smooth" });
  };

  // Envío del formulario de contacto (placeholder)
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí podrías conectar con un endpoint o servicio
  };

  return (
    <main className="relative">
      <Header />

      <HeroSection
        user={!!user}
        handleDashboardRedirect={redirectToDashboard}
        handleScrollToForm={scrollToContactForm}
      />

      <section className="max-w-7xl mx-auto space-y-4">
        <Management />
        <FeaturesGrid />
      </section>

      <section
        id="contact-form"
        aria-labelledby="contact-form-title"
        className="max-w-7xl mx-auto mb-20 lg:px-20"
      >
        <div className="bg-[#292a2d] rounded-lg border border-zinc-700 p-8">
          <h2
            id="contact-form-title"
            className={`${merriweather.className} text-3xl font-bold text-orange-400 text-center mb-8`}
          >
            ¿Listo para transformar tu organización?
          </h2>

          <form
            onSubmit={handleFormSubmit}
            aria-label="Formulario de contacto"
            className="space-y-4"
          >
            <input
              type="text"
              name="nombre"
              required
              aria-label="Tu nombre"
              placeholder="Tu Nombre"
              className={`${firacode.className} w-full px-4 py-3 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0`}
            />

            <input
              type="email"
              name="email"
              required
              aria-label="Tu correo electrónico"
              placeholder="Tu Email"
              className={`${firacode.className} w-full px-4 py-3 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0`}
            />

            <textarea
              name="mensaje"
              required
              aria-label="Tu mensaje"
              placeholder="Tu Mensaje"
              rows={4}
              className={`${firacode.className} w-full px-4 py-3 bg-white/5 text-zinc-200 placeholder:text-zinc-600 border border-gray-600 rounded-lg focus:ring-orange-500 focus:border-orange-500 transition focus:outline-none focus:ring-0`}
            />

            <button
              type="submit"
              className={`${merriweather.className} w-full px-6 py-3 bg-orange-600/20 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 transition duration-100 rounded-md flex items-center justify-center gap-2`}
            >
              <BiSend className="w-4 h-4" />
              Enviar Mensaje
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Home;
